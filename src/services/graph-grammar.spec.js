import { fail } from 'assert';

import graphGrammar from './graph-grammar';

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

    it('matches multiple nodes', () => {
      const matchResult = graphGrammar.match('(foo)(bar)(baz)');
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
          },
        ],
        groups: [],
      });
    });

    it('turns multiple nodes into an object with a multiple nodes', () => {
      const result = graphGrammar.eval(graphGrammar.match('(foo)(bar)(baz)'));
      expect(result).toEqual({
        nodes: [
          {
            id: 'foo',
          },
          {
            id: 'bar',
          },
          {
            id: 'baz',
          },
        ],
        groups: [],
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
          },
        ],
        nodes: [
          {
            id: 'foo',
          },
          {
            id: 'bar',
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
          },
          {
            id: expect.anything(),
            source: 'baz',
            target: 'bar',
            label: expect.anything(),
          },
        ],
        nodes: [
          {
            id: 'foo',
          },
          {
            id: 'bar',
          },
          {
            id: 'baz',
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
          },
          {
            id: expect.anything(),
            label: 'quux',
            source: 'baz',
            target: 'bar',
          },
        ],
        nodes: [
          {
            id: 'foo',
          },
          {
            id: 'bar',
          },
          {
            id: 'baz',
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
          },
        ],
        nodes: [
          {
            id: 'foo bar',
          },
          {
            id: 'bar baz',
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
        groups: [
          {
            id: expect.anything(),
            name: 'bar',
          },
        ],
      });
    });

    it('turns two nodes with repeated groups into a node and non-repeated groups', () => {
      const result = graphGrammar.eval(graphGrammar.match('(foo:bar:baz)(qux:bar:quux)'));
      expect(result).toEqual({
        nodes: [
          {
            id: 'foo',
            groups: [
              {
                id: expect.anything(),
                name: 'bar',
              },
              {
                id: expect.anything(),
                name: 'baz',
              },
            ],
          },
          {
            id: 'qux',
            groups: [
              {
                id: expect.anything(),
                name: 'bar',
              },
              {
                id: expect.anything(),
                name: 'quux',
              },
            ],
          },
        ],
        groups: [
          {
            id: expect.anything(),
            name: 'bar',
          },
          {
            id: expect.anything(),
            name: 'baz',
          },
          {
            id: expect.anything(),
            name: 'quux',
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
          },
          {
            id: 'bar',
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
  });
});