import * as ohm from 'ohm-js';
import _flattenDeep from 'lodash/flattenDeep';
import _omitBy from 'lodash/omitBy';
import _isNil from 'lodash/isNil';
import uuid from 'uuid/v4';
import { red, purple, blue, green, yellow, orange, brown, grey } from '@material-ui/core/colors';

const grammar = `
Grapher {

  paths
      = pathWithSeparator+ path --multiplePaths
      | path --singlePath
      | comment

  pathWithSeparator = separator? path separator

  path
      = partialPath+ node spaces comment --partialsWithComment
      | partialPath+ node --partials
      | node spaces comment --nodeWithComment
      | node --node
      | group spaces comment --groupWithComment
      | group --group

  partialPath = node link

  node
      = "(" identifier ")" --nodeNoGroups
      | "(" identifier groups ")" --nodeGroups

  link
      = "-[" identifier "]->" --forwardWithLabel
      | "<-[" identifier "]-" --backwardWithLabel
      | "-[" identifier? groups "]->" --forwardGroups
      | "<-[" identifier? groups "]-" --backwardGroups
      | "->" --forward
      | "<-" --backward

  groups = groups+ --multipleGroups
    | group --singleGroup
      
  group = ":" identifier " " color --coloredGroup
    | ":" identifier --uncoloredGroup
  
  color = "#red" --red
    | "#purple" --purple
    | "#blue" --blue
    | "#green" --green
    | "#yellow" --yellow
    | "#orange" --orange
    | "#brown" --brown
    | "#grey" --grey
    | "#" hexDigit hexDigit hexDigit hexDigit hexDigit hexDigit --sixHex
    | "#" hexDigit hexDigit hexDigit --threeHex

  identifier
      = identifier space identifier  --withBlanks
      | alnum+ --string

  separator = ";" | "\\n"+
  
  comment = "#" ~"\\n" any* --endOfLineComment
      | "#" ~end any* --endOfInputComment

}
`;

class GraphGrammar {
  grammar;
  semantics;

  async initialize() {
    this.grammar = ohm.grammar(grammar);
    this.semantics = this.grammar.createSemantics().addOperation('eval', {
      paths_multiplePaths: (pathWithSeparators, path) => {
        const entities = _flattenDeep([...pathWithSeparators.eval(), ...path.eval()]);
        return mapEntities(entities);
      },
      paths_singlePath: (path) => {
        const entities = path.eval();
        return mapEntities(entities);
      },
      pathWithSeparator: (firstSeparator, path, separator) => path.eval(),
      path_partials: (partialPaths, node) => _flattenDeep([...partialPaths.eval(), node.eval()]),
      path_partialsWithComment: (partialPaths, node, spaces, comment) => _flattenDeep([...partialPaths.eval(), node.eval()]),
      path_node: (node) => node.eval(),
      path_nodeWithComment: (node, spaces, comment) => node.eval(),
      path_group: (group) => group.eval(),
      path_groupWithComment: (group, spaces, comment) => group.eval(),
      partialPath: (node, link) => _flattenDeep([node.eval(), link.eval()]),
      node_nodeNoGroups: (open, identifier, close) => [
        {
          type: 'node',
          id: identifier.eval(),
        },
      ],
      node_nodeGroups: (open, identifier, groups, close) => {
        const groupsArray = groups.eval();
        return [
          {
            type: 'node',
            id: identifier.eval(),
            groups: groupsArray.map(mapGroup),
          },
          ...groupsArray,
        ];
      },
      link_forwardWithLabel: (open, identifier, close) => [
        {
          type: 'link',
          direction: 'forth',
          label: identifier.eval(),
          id: uuid(),
        },
      ],
      link_backwardWithLabel: (close, identifier, open) => [
        {
          type: 'link',
          direction: 'back',
          label: identifier.eval(),
          id: uuid(),
        },
      ],
      link_forwardGroups: (open, identifier, groups, close) => {
        const groupsArray = groups.eval();
        return [
          _omitBy(
            {
              type: 'link',
              direction: 'forth',
              label: !!identifier ? identifier.eval()[0] : undefined,
              id: uuid(),
              groups: groupsArray.map(mapGroup),
            },
            _isNil
          ),
          ...groupsArray,
        ];
      },
      link_backwardGroups: (close, identifier, groups, open) => {
        const groupsArray = groups.eval();
        return [
          _omitBy(
            {
              type: 'link',
              direction: 'back',
              label: !!identifier ? identifier.eval()[0] : undefined,
              id: uuid(),
              groups: groupsArray.map(mapGroup),
            },
            _isNil
          ),
          ...groupsArray,
        ];
      },
      link_forward: (chars) => [
        {
          type: 'link',
          direction: 'forth',
          id: uuid(),
        },
      ],
      link_backward: (chars) => [
        {
          type: 'link',
          direction: 'back',
          id: uuid(),
        },
      ],
      groups_singleGroup: (group) => group.eval(),
      group_uncoloredGroup: (colon, identifier) => [
        {
          type: 'group',
          name: identifier.eval(),
        },
      ],
      group_coloredGroup: (colon, identifier, space, color) => [
        {
          type: 'group',
          name: identifier.eval(),
          color: color.eval(),
        },
      ],
      color_red: (text) => red['A700'],
      color_purple: (text) => purple['A700'],
      color_blue: (text) => blue['A700'],
      color_green: (text) => green['A700'],
      color_yellow: (text) => yellow['A700'],
      color_orange: (text) => orange['A700'],
      color_brown: (text) => brown['A700'],
      color_grey: (text) => grey['A700'],
      color_threeHex: (hashtag, hexA, hexB, hexC) => `#${hexA.sourceString}${hexB.sourceString}${hexC.sourceString}`,
      color_sixHex: (hashtag, hexA, hexB, hexC, hexD, hexE, hexF) => {
        return `#${hexA.sourceString}${hexB.sourceString}${hexC.sourceString}${hexD.sourceString}${hexE.sourceString}${hexF.sourceString}`;
      },
      groups_multipleGroups: (groups) => _flattenDeep(groups.eval()),
      identifier_string: function(chars) {
        return this.sourceString;
      },
      identifier_withBlanks: function(firstIdentifier, space, secondIdentifier) {
        return this.sourceString;
      },
    });
  }

  match(string = '') {
    return this.grammar.match(string);
  }

  eval(matchResult) {
    return this.semantics(matchResult).eval();
  }
}

const graphGrammar = new GraphGrammar();
graphGrammar.initialize();
export default graphGrammar;

const mapGroup = (group) => {
  return {
    id: uuid(),
    name: group.name,
    color: group.color,
  };
};

const mapNode = (node) =>
  _omitBy(
    {
      id: node.id,
      groups: !!node.groups ? node.groups.map(mapGroup) : [],
    },
    _isNil
  );

const mapEntities = (entities) => {
  const groups = entities
    .filter(({ type }) => type === 'group')
    .map(mapGroup)
    .filter((item, index, groups) => groups.findIndex((candidate) => candidate.name === item.name) === index);
  const nodesAndLinks = entities.filter(({ type }) => type !== 'group');
  const nodes = entities
    .filter(({ type }) => type === 'node')
    .map(mapNode)
    .map(({ groups, ...node }) => ({
      ...node,
      groups: groups.map(({ name }) => groups.find(({ name: candidateName }) => candidateName === name)),
    }))
    .reduce((allNodes, node) => {
      const existingNode = allNodes[node.id] || {};
      const existingGroups = existingNode.groups || [];
      return {
        ...allNodes,
        [node.id]: {
          ...existingNode,
          ...node,
          groups: [...existingGroups, ...node.groups]
            .filter((item, index, groups) => groups.findIndex((candidate) => candidate.name === item.name) === index)
            .map(({ name }) => groups.find(({ name: existingGroupName }) => existingGroupName === name)),
        },
      };
    }, {});
  const links = nodesAndLinks
    .map((entity, index) => [entity, index])
    .filter(([entity]) => entity.type === 'link')
    .map(([entity, index]) => {
      const source = entity.direction === 'back' ? nodesAndLinks[index + 1].id : nodesAndLinks[index - 1].id;
      const target = entity.direction === 'back' ? nodesAndLinks[index - 1].id : nodesAndLinks[index + 1].id;
      const label = entity.label || `${source}-${target}`;
      const linkGroups = (entity.groups || []).map(({ name }) => groups.find(({ name: candidateName }) => candidateName === name));
      return {
        id: entity.id,
        label,
        source,
        target,
        groups: linkGroups,
      };
    })
    .reduce((linksBySourceAndTarget, link) => {
      const sourceAndTargetId = `${link.source}-${link.target}`;
      const existingLink = linksBySourceAndTarget[sourceAndTargetId] || {};
      const existingGroups = existingLink.groups || [];
      return {
        ...linksBySourceAndTarget,
        [sourceAndTargetId]: {
          ...existingLink,
          ...link,
          groups: [...existingGroups, ...link.groups]
            .filter((item, index, groups) => groups.findIndex((candidate) => candidate.name === item.name) === index)
            .map(({ name }) => groups.find(({ name: existingGroupName }) => existingGroupName === name)),
        },
      };
    }, {});
  return {
    nodes: Object.keys(nodes).map((nodeId) => nodes[nodeId]),
    links: Object.keys(links).map((key) => links[key]),
    groups,
  };
};

export const sampleGraph = `# First, we define groups to assign them colors
:King #red
:Queen #purple
:Wizard #blue
:Antagonist #grey
:Knight #green

# These are normal groups, but we'll use them for links, which have no coloring
:family
:lovers

# Now, nodes. You do not need to define nodes independently, but it's a good way to assign them groups and later just use them by name.
(Arthur:King)
(Guinevere:Queen)
(Merlin:Wizard)
(Mordred:Antagonist)
(Lancelot:Knight)
(Galahad:Knight)
(Lamorak:Knight)
(Bors:Knight)

# And throw in some paths between your nodes
(Arthur)-[:lovers]->(Guinevere)<-[:lovers]-(Lancelot)
(Arthur)-[:family]->(Mordred)
(Lancelot)-[:family]->(Galahad)
(Arthur)->(Merlin)
(Lancelot)->(Arthur)<-(Galahad)->(Lamorak)
(Lamorak)->(Arthur)<-(Bors)
(Lancelot)-[:family]->(Bors)`;
