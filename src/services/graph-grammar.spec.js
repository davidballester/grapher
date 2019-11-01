import { fail } from 'assert';
import { red } from '@material-ui/core/colors';

import graphGrammar, { sampleGraph } from './graph-grammar';

jest.mock('uuid/v4', () => ({
  __esModule: true,
  default: () => 'uuid',
}));

describe('graph-grammar', () => {
  beforeAll(async () => {
    await graphGrammar.initialize();
  });

  describe('#match', () => {
    it('fails to match an empty string', () => {
      const matchResult = graphGrammar.match('');
      expect(matchResult.succeeded()).toBeFalsy();
    });

    it('fails to match an invalid string', () => {
      const matchResult = graphGrammar.match('foo-->bar');
      expect(matchResult.succeeded()).toBeFalsy();
    });

    it('matches a single node', () => {
      const matchResult = graphGrammar.match('(foo)');
      expect(matchResult.succeeded()).toBeTruthy();
    });

    it('matches a single group', () => {
      const matchResult = graphGrammar.match(':foo');
      expect(matchResult.succeeded()).toBeTruthy();
    });

    it('matches a single colored group that uses a primitive color', () => {
      const matchResult = graphGrammar.match(':foo #red');
      expect(matchResult.succeeded()).toBeTruthy();
    });

    it('matches a single colored group that uses a three digits hexadecimal color', () => {
      const matchResult = graphGrammar.match(':foo #123');
      expect(matchResult.succeeded()).toBeTruthy();
    });

    it('matches a single colored group that uses a six digits hexadecimal color', () => {
      const matchResult = graphGrammar.match(':foo #123456');
      expect(matchResult.succeeded()).toBeTruthy();
    });

    it('matches simple paths', () => {
      const matchResult = graphGrammar.match('(foo)->(bar)');
      expect(matchResult.succeeded()).toBeTruthy();
    });

    it('matches complex paths', () => {
      const matchResult = graphGrammar.match('(foo)->(bar)<-(baz)');
      expect(matchResult.succeeded()).toBeTruthy();
    });

    it('matches simple labeled paths', () => {
      const matchResult = graphGrammar.match('(foo)-[baz]->(bar)');
      expect(matchResult.succeeded()).toBeTruthy();
    });

    it('matches complex labeled paths', () => {
      const matchResult = graphGrammar.match('(foo)-[qux]->(bar)<-[quux]-(baz)');
      expect(matchResult.succeeded()).toBeTruthy();
    });

    it('matches identifiers with spaces', () => {
      const matchResult = graphGrammar.match('(foo bar)-[qux quux]->(bar baz)');
      expect(matchResult.succeeded()).toBeTruthy();
    });

    it('matches nodes with a single group', () => {
      const matchResult = graphGrammar.match('(foo:bar)');
      expect(matchResult.succeeded()).toBeTruthy();
    });

    it('matches nodes with multiple groups', () => {
      const matchResult = graphGrammar.match('(foo:bar:baz quux)');
      expect(matchResult.succeeded()).toBeTruthy();
    });

    it('matches links with groups', () => {
      const matchResult = graphGrammar.match('(foo)-[bar:baz]->(qux)');
      expect(matchResult.succeeded()).toBeTruthy();
    });

    it('matches links with multiple groups', () => {
      const matchResult = graphGrammar.match('(foo)-[bar:baz:qux quux]->(corge)');
      expect(matchResult.succeeded()).toBeTruthy();
    });

    it('matches links with multiple groups without identifiers', () => {
      const matchResult = graphGrammar.match('(foo)-[:baz:qux quux]->(corge)');
      expect(matchResult.succeeded()).toBeTruthy();
    });

    it('matches a list of nodes', () => {
      const matchResult = graphGrammar.match('(foo);(bar);(baz)');
      expect(matchResult.succeeded()).toBeTruthy();
    });

    it('matches a list of paths and nodes', () => {
      const matchResult = graphGrammar.match('(foo)-[:baz:qux quux]->(corge);(bar);(foo)-[baz]->(bar)');
      expect(matchResult.succeeded()).toBeTruthy();
    });

    it('matches a list of paths and nodes separated by line breaks', () => {
      const matchResult = graphGrammar.match(`(foo)-[:baz:qux quux]->(corge)

(bar);(foo)-[baz]->(bar)`);
      expect(matchResult.succeeded()).toBeTruthy();
    });
  });

  describe('#eval', () => {
    it('fails on an invalid string', () => {
      try {
        graphGrammar.eval(graphGrammar.match('foo-->bar'));
        fail('Expected an error');
      } catch (error) {
        expect(error).toBeDefined();
      }
    });

    it('turns a single node into an object with a single node', () => {
      const result = graphGrammar.eval(graphGrammar.match('(foo)'));
      expect(result).toEqual({
        nodes: [
          {
            id: 'foo',
            groups: [],
          },
        ],
        links: [],
        groups: [],
      });
    });

    it('turns a single group into an object with a single group', () => {
      const result = graphGrammar.eval(graphGrammar.match(':foo'));
      expect(result).toEqual({
        nodes: [],
        links: [],
        groups: [
          {
            id: expect.anything(),
            name: 'foo',
          },
        ],
      });
    });

    it('turns a single group with a primitive color into an object with a single group', () => {
      const result = graphGrammar.eval(graphGrammar.match(':foo #red'));
      expect(result).toEqual({
        nodes: [],
        links: [],
        groups: [
          {
            id: expect.anything(),
            name: 'foo',
            color: red['A700'],
          },
        ],
      });
    });

    it('turns a single group with a three hexadecimal color into an object with a single group', () => {
      const result = graphGrammar.eval(graphGrammar.match(':foo #123'));
      expect(result).toEqual({
        nodes: [],
        links: [],
        groups: [
          {
            id: expect.anything(),
            name: 'foo',
            color: '#123',
          },
        ],
      });
    });

    it('turns a single group with a six hexadecimal color into an object with a single group', () => {
      const result = graphGrammar.eval(graphGrammar.match(':foo #123456'));
      expect(result).toEqual({
        nodes: [],
        links: [],
        groups: [
          {
            id: expect.anything(),
            name: 'foo',
            color: '#123456',
          },
        ],
      });
    });

    it('creates a link with the specified label', () => {
      const result = graphGrammar.eval(graphGrammar.match('(foo)-[baz]->(bar)'));
      expect(result.links).toEqual([
        expect.objectContaining({
          label: 'baz',
        }),
      ]);
    });

    it('uses source and target to generate a link label if none is defined', () => {
      const result = graphGrammar.eval(graphGrammar.match('(foo)->(bar)'));
      expect(result.links).toEqual([
        expect.objectContaining({
          label: 'foo-bar',
        }),
      ]);
    });

    it('turns a simple path into an object with two nodes and a link', () => {
      const result = graphGrammar.eval(graphGrammar.match('(foo)->(bar)'));
      expect(result).toEqual({
        links: [
          {
            id: expect.anything(),
            label: expect.anything(),
            source: 'foo',
            target: 'bar',
            groups: [],
          },
        ],
        nodes: [
          {
            id: 'foo',
            groups: [],
          },
          {
            id: 'bar',
            groups: [],
          },
        ],
        groups: [],
      });
    });

    it('turns complex paths into an object properly formed', () => {
      const result = graphGrammar.eval(graphGrammar.match('(foo)->(bar)<-(baz)'));
      expect(result).toEqual({
        links: [
          {
            id: expect.anything(),
            source: 'foo',
            target: 'bar',
            label: expect.anything(),
            groups: [],
          },
          {
            id: expect.anything(),
            source: 'baz',
            target: 'bar',
            label: expect.anything(),
            groups: [],
          },
        ],
        nodes: [
          {
            id: 'foo',
            groups: [],
          },
          {
            id: 'bar',
            groups: [],
          },
          {
            id: 'baz',
            groups: [],
          },
        ],
        groups: [],
      });
    });

    it('turns complex labeled paths into an object properly formed', () => {
      const result = graphGrammar.eval(graphGrammar.match('(foo)-[qux]->(bar)<-[quux]-(baz)'));
      expect(result).toEqual({
        links: [
          {
            id: expect.anything(),
            label: 'qux',
            source: 'foo',
            target: 'bar',
            groups: [],
          },
          {
            id: expect.anything(),
            label: 'quux',
            source: 'baz',
            target: 'bar',
            groups: [],
          },
        ],
        nodes: [
          {
            id: 'foo',
            groups: [],
          },
          {
            id: 'bar',
            groups: [],
          },
          {
            id: 'baz',
            groups: [],
          },
        ],
        groups: [],
      });
    });

    it('turns complex labeled paths with spaces in their identifiers into an object properly formed', () => {
      const result = graphGrammar.eval(graphGrammar.match('(foo bar)-[qux quux]->(bar baz)'));
      expect(result).toEqual({
        links: [
          {
            id: expect.anything(),
            label: 'qux quux',
            source: 'foo bar',
            target: 'bar baz',
            groups: [],
          },
        ],
        nodes: [
          {
            id: 'foo bar',
            groups: [],
          },
          {
            id: 'bar baz',
            groups: [],
          },
        ],
        groups: [],
      });
    });

    it('turns a single node with a group into a node and a group', () => {
      const result = graphGrammar.eval(graphGrammar.match('(foo:bar)'));
      expect(result).toEqual({
        nodes: [
          {
            id: 'foo',
            groups: [
              {
                id: expect.anything(),
                name: 'bar',
              },
            ],
          },
        ],
        links: [],
        groups: [
          {
            id: expect.anything(),
            name: 'bar',
          },
        ],
      });
    });

    it('turns a simple path with groups into those nodes, link and groups', () => {
      const result = graphGrammar.eval(graphGrammar.match('(foo)-[:qux]->(bar)'));
      expect(result).toEqual({
        links: [
          {
            id: expect.anything(),
            label: expect.anything(),
            source: 'foo',
            target: 'bar',
            groups: [
              {
                id: expect.anything(),
                name: 'qux',
              },
            ],
          },
        ],
        nodes: [
          {
            id: 'foo',
            groups: [],
          },
          {
            id: 'bar',
            groups: [],
          },
        ],
        groups: [
          {
            id: expect.anything(),
            name: 'qux',
          },
        ],
      });
    });

    it('turns a complex path with groups a well-formed graph', () => {
      const result = graphGrammar.eval(graphGrammar.match('(foo:bar baz)-[qux:quux]->(corge:bar baz:grault)'));
      expect(result).toEqual({
        links: [
          {
            id: expect.anything(),
            source: 'foo',
            target: 'corge',
            label: 'qux',
            groups: [
              {
                id: expect.anything(),
                name: 'quux',
              },
            ],
          },
        ],
        nodes: [
          {
            id: 'foo',
            groups: [
              {
                id: expect.anything(),
                name: 'bar baz',
              },
            ],
          },
          {
            id: 'corge',
            groups: [
              {
                id: expect.anything(),
                name: 'bar baz',
              },
              {
                id: expect.anything(),
                name: 'grault',
              },
            ],
          },
        ],
        groups: [
          {
            id: expect.anything(),
            name: 'bar baz',
          },
          {
            id: expect.anything(),
            name: 'quux',
          },
          {
            id: expect.anything(),
            name: 'grault',
          },
        ],
      });
    });

    it('transforms a list of nodes', () => {
      const result = graphGrammar.eval(graphGrammar.match('(Aragorn);(Gandalf)'));
      expect(result).toEqual({
        nodes: [
          {
            id: 'Aragorn',
            groups: [],
          },
          {
            id: 'Gandalf',
            groups: [],
          },
        ],
        links: [],
        groups: [],
      });
    });

    it('transforms a path and a node', () => {
      const result = graphGrammar.eval(graphGrammar.match('(Aragorn)<-(Gandalf);(Elrond)'));
      expect(result).toEqual({
        nodes: [
          {
            id: 'Aragorn',
            groups: [],
          },
          {
            id: 'Gandalf',
            groups: [],
          },
          {
            id: 'Elrond',
            groups: [],
          },
        ],
        links: [
          {
            id: expect.anything(),
            label: expect.anything(),
            source: 'Gandalf',
            target: 'Aragorn',
            groups: [],
          },
        ],
        groups: [],
      });
    });

    it('does not duplicate nodes', () => {
      const result = graphGrammar.eval(graphGrammar.match('(Aragorn)<-(Gandalf);(Aragorn);(Aragorn)->(Boromir)'));
      expect(result).toEqual({
        nodes: [
          {
            id: 'Aragorn',
            groups: [],
          },
          {
            id: 'Gandalf',
            groups: [],
          },
          {
            id: 'Boromir',
            groups: [],
          },
        ],
        links: expect.anything(),
        groups: [],
      });
    });

    it('does not duplicate links', () => {
      const result = graphGrammar.eval(graphGrammar.match('(Aragorn)<-(Gandalf);(Gandalf)->(Aragorn)'));
      expect(result).toEqual({
        nodes: expect.anything(),
        links: [
          {
            id: expect.anything(),
            label: expect.anything(),
            source: 'Gandalf',
            target: 'Aragorn',
            groups: [],
          },
        ],
        groups: [],
      });
    });

    it('does not duplicate groups', () => {
      const result = graphGrammar.eval(
        graphGrammar.match('(Aragorn:Dunedain)<-[:knows]-(Gandalf:Maia);(Aragorn:Dunedain)-[:knows]->(Boromir:Dunedain)')
      );
      expect(result).toEqual({
        nodes: expect.anything(),
        links: expect.anything(),
        groups: [
          {
            id: expect.anything(),
            name: 'Dunedain',
          },
          {
            id: expect.anything(),
            name: 'knows',
          },
          {
            id: expect.anything(),
            name: 'Maia',
          },
        ],
      });
    });

    it('does not duplicate groups in nodes', () => {
      const result = graphGrammar.eval(graphGrammar.match('(Aragorn:Dunedain:Heir);(Aragorn:Dunedain)'));
      expect(result).toEqual({
        nodes: [
          {
            id: 'Aragorn',
            groups: [
              {
                id: expect.anything(),
                name: 'Dunedain',
              },
              {
                id: expect.anything(),
                name: 'Heir',
              },
            ],
          },
        ],
        links: expect.anything(),
        groups: expect.anything(),
      });
    });

    it('does not duplicate groups in links', () => {
      const result = graphGrammar.eval(graphGrammar.match('(Aragorn)<-[:knows]-(Gandalf);(Gandalf)-[:knows:respects]->(Aragorn)'));
      expect(result).toEqual({
        nodes: expect.anything(),
        links: [
          {
            id: expect.anything(),
            label: expect.anything(),
            source: 'Gandalf',
            target: 'Aragorn',
            groups: [
              {
                id: expect.anything(),
                name: 'knows',
              },
              {
                id: expect.anything(),
                name: 'respects',
              },
            ],
          },
        ],
        groups: expect.anything(),
      });
    });

    it('preserves first color defined for a group', () => {
      const result = graphGrammar.eval(graphGrammar.match(':foo #red;:foo #yellow'));
      expect(result).toEqual({
        nodes: expect.anything(),
        links: expect.anything(),
        groups: [
          {
            id: expect.anything(),
            name: 'foo',
            color: red['A700'],
          },
        ],
      });
    });

    it('includes colors of groups in nodes', () => {
      const result = graphGrammar.eval(graphGrammar.match(':foo #red;(bar:foo)'));
      expect(result).toEqual({
        nodes: [
          {
            id: 'bar',
            groups: [
              {
                id: expect.anything(),
                name: 'foo',
                color: red['A700'],
              },
            ],
          },
        ],
        links: expect.anything(),
        groups: expect.anything(),
      });
    });
  });

  describe('sampleGraph', () => {
    it('is valid', () => {
      const matchResult = graphGrammar.match(sampleGraph);
      expect(matchResult.succeeded()).toBeTruthy();
    });
  });
});
