import { fail } from 'assert';

import graphGrammar from './graph-grammar';

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
      });
    });

    it('turns a simple path into an object with two nodes and a link', () => {
      const result = graphGrammar.eval(graphGrammar.match('(foo)->(bar)'));
      expect(result).toEqual({
        links: [
          {
            id: expect.anything(),
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
          },
          {
            id: expect.anything(),
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
      });
    });

    it('turns a simple labeled path into an object with two nodes and a link', () => {
      const result = graphGrammar.eval(graphGrammar.match('(foo)-[baz]->(bar)'));
      expect(result).toEqual({
        links: [
          {
            id: expect.anything(),
            label: 'baz',
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
      });
    });
  });
});
