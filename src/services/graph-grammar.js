import * as ohm from 'ohm-js';
import flatten from 'lodash/flatten';
import uuid from 'uuid/v4';

const grammar = `
Grapher {

  path
      = partialPath+ node --partials
      | node+ --nodes

  partialPath = node link

  node
      = "(" identifier ")"

  link
      = "-[" identifier "]->" --forwardWithLabel
      | "<-[" identifier "]-" --backwardWithLabel
      | "->" --forward
      | "<-" --backward

  identifier
      = alnum+ --string
      | identifier space identifier  --withBlanks

}
`;

class GraphGrammar {
  grammar;
  semantics;

  async initialize() {
    this.grammar = ohm.grammar(grammar);
    this.semantics = this.grammar.createSemantics().addOperation('eval', {
      path_partials: (partialPaths, node) => {
        const entities = flatten([...partialPaths.eval(), node.eval()]);
        return {
          nodes: entities.filter((entity) => entity.type === 'node'),
          links: entities
            .map((entity, index) => [entity, index])
            .filter(([entity]) => entity.type === 'link')
            .map(([entity, index]) => ({
              id: entity.id,
              source: entity.direction === 'back' ? entities[index + 1].id : entities[index - 1].id,
              target: entity.direction === 'back' ? entities[index - 1].id : entities[index + 1].id,
            })),
        };
      },
      path_nodes: (nodes) => ({
        nodes: nodes.eval(),
      }),
      partialPath: (node, link) => [node.eval(), link.eval()],
      node: (open, identifier, close) => ({
        type: 'node',
        id: identifier.eval(),
      }),
      link_forwardWithLabel: (open, identifier, close) => ({
        type: 'link',
        direction: 'forth',
        label: identifier.eval(),
        id: uuid(),
      }),
      link_backwardWithLabel: (close, identifier, open) => ({
        type: 'link',
        direction: 'back',
        label: identifier.eval(),
        id: uuid(),
      }),
      link_forward: (chars) => ({
        type: 'link',
        direction: 'forth',
        id: uuid(),
      }),
      link_backward: (chars) => ({
        type: 'link',
        direction: 'back',
        id: uuid(),
      }),
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
