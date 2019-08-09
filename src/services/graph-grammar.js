import * as ohm from 'ohm-js';
import _flattenDeep from 'lodash/flattenDeep';
import _omitBy from 'lodash/omitBy';
import _isNil from 'lodash/isNil';
import uuid from 'uuid/v4';

const grammar = `
Grapher {

  paths
      = pathWithSeparator+ path --multiplePaths
      | path --singlePath

  pathWithSeparator = path ";"

  path
      = partialPath+ node --partials
      | node --node

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

  groups
      = groups+ --multipleGroups
      | ":" identifier --singleGroup

  identifier
      = identifier space identifier  --withBlanks
      | alnum+ --string

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
      pathWithSeparator: (path, separator) => path.eval(),
      path_partials: (partialPaths, node) => _flattenDeep([...partialPaths.eval(), node.eval()]),
      path_node: (node) => node.eval(),
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
      groups_singleGroup: (colon, identifier) => [
        {
          type: 'group',
          name: identifier.eval(),
        },
      ],
      groups_multipleGroups: (groups) => _flattenDeep(groups.eval()),
      identifier_string: function(chars) {
        return this.sourceString;
      },
      identifier_withBlanks: function(firstIdentifier, space, secondIdentifier) {
        return this.sourceString;
      },
    });
  }

  match(string) {
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
          groups: [...existingGroups, ...node.groups].filter(
            (item, index, groups) => groups.findIndex((candidate) => candidate.name === item.name) === index
          ),
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
          groups: [...existingGroups, ...link.groups].filter(
            (item, index, groups) => groups.findIndex((candidate) => candidate.name === item.name) === index
          ),
        },
      };
    }, {});
  return {
    nodes: Object.keys(nodes).map((nodeId) => nodes[nodeId]),
    links: Object.keys(links).map((key) => links[key]),
    groups,
  };
};
