/* eslint-disable import/first */
jest.mock('uuid/v4', () => ({
  __esModule: true,
  default: () => 'uuid',
}));

import { setGraphName, createGraph, loadGraphSuccess, importSubgraph } from './graph.actions';
import reducer from './graph.reducer';

describe('reducer', () => {
  describe('GRAPH_SET_NAME', () => {
    it('sets the `name` in the state to the payload of the given action', () => {
      const initialState = {
        name: undefined,
      };
      const expectedName = 'foo';
      const action = setGraphName('id', expectedName);
      const state = reducer(initialState, action);
      expect(state.name).toEqual(expectedName);
    });
  });

  describe('GRAPH_CREATE', () => {
    it('sets the full graph in the state to the payload of the given action', () => {
      const graph = {
        nodes: {
          bar: {},
        },
        links: {
          baz: {},
        },
      };
      const initialState = {};
      const action = createGraph(graph);
      const state = reducer(initialState, action);
      expect(state).toMatchObject(graph);
    });

    it('sets the ID of the graph', () => {
      const initialState = {};
      const action = createGraph({});
      const state = reducer(initialState, action);
      expect(state.id).toEqual('uuid');
    });

    it('resets previous graph even if new one is empty', () => {
      const initialState = {
        id: 'foo',
        nodes: {
          foo: {},
        },
        links: {
          bar: {},
        },
        groups: {
          baz: {},
        },
      };
      const expectedState = {
        id: 'uuid',
        name: '',
        nodes: {},
        links: {},
        groups: {},
      };
      const action = createGraph({});
      const state = reducer(initialState, action);
      expect(state).toEqual(expectedState);
    });
  });

  describe('GRAPH_LOAD_SUCCESS', () => {
    it('sets the payload in the state', () => {
      const initialState = {
        foo: 'bar',
      };
      const graph = {
        name: 'foo',
        nodes: {},
        links: {},
      };
      const action = loadGraphSuccess(graph);
      const state = reducer(initialState, action);
      expect(state).toEqual({
        ...graph,
      });
    });
  });

  describe('GRAPH_IMPORT_SUBGRAPH', () => {
    it('adds the nodes in the payload to the state', () => {
      const nodes = [
        {
          id: 'foo',
        },
      ];
      const action = importSubgraph(nodes);
      const initialState = {
        nodes: {
          bar: {
            id: 'bar',
          },
        },
      };
      const expectedState = {
        nodes: {
          bar: {
            id: 'bar',
          },
          foo: {
            id: 'foo',
          },
        },
      };

      const state = reducer(initialState, action);

      expect(state).toMatchObject(expectedState);
    });

    it('replaces existing nodes', () => {
      const nodes = [
        {
          id: 'foo',
          bar: 'baz',
        },
      ];
      const action = importSubgraph(nodes);
      const initialState = {
        nodes: {
          foo: {
            id: 'foo',
            baz: 'qux',
          },
        },
      };
      const expectedState = {
        nodes: {
          foo: {
            id: 'foo',
            bar: 'baz',
          },
        },
      };

      const state = reducer(initialState, action);

      expect(state).toMatchObject(expectedState);
    });

    it('adds the links in the payload to the state', () => {
      const links = [
        {
          id: 'foo',
          source: 'baz',
          target: 'qux',
        },
      ];
      const action = importSubgraph(undefined, links);
      const initialState = {
        links: {
          bar: {
            id: 'bar',
          },
        },
      };
      const expectedState = {
        links: {
          bar: {
            id: 'bar',
          },
          foo: {
            id: 'foo',
            source: 'baz',
            target: 'qux',
          },
        },
      };

      const state = reducer(initialState, action);

      expect(state).toMatchObject(expectedState);
    });

    it('replaces existing links', () => {
      const nodes = [
        {
          id: 'foo',
          source: 'bar',
          target: 'baz',
          qux: 'quux',
        },
      ];
      const action = importSubgraph(nodes);
      const initialState = {
        nodes: {
          foo: {
            id: 'foo',
            source: 'bar',
            target: 'baz',
          },
        },
      };
      const expectedState = {
        nodes: {
          foo: {
            id: 'foo',
            source: 'bar',
            target: 'baz',
            qux: 'quux',
          },
        },
      };

      const state = reducer(initialState, action);

      expect(state).toMatchObject(expectedState);
    });

    it('adds the groups in the payload to the state', () => {
      const groups = [
        {
          id: 'foo',
          name: 'lorem',
        },
      ];
      const action = importSubgraph(undefined, undefined, groups);
      const initialState = {
        groups: {
          bar: {
            id: 'bar',
            name: 'ipsum',
          },
        },
      };
      const expectedState = {
        groups: {
          bar: {
            id: 'bar',
            name: 'ipsum',
          },
          foo: {
            id: 'foo',
            name: 'lorem',
          },
        },
      };

      const state = reducer(initialState, action);

      expect(state).toMatchObject(expectedState);
    });

    it('replaces existing groups', () => {
      const groups = [
        {
          id: 'foo',
          name: 'lorem',
        },
      ];
      const action = importSubgraph(undefined, undefined, groups);
      const initialState = {
        groups: {
          foo: {
            id: 'foo',
            name: 'ipsum',
          },
        },
      };
      const expectedState = {
        groups: {
          foo: {
            id: 'foo',
            name: 'lorem',
          },
        },
      };

      const state = reducer(initialState, action);

      expect(state).toMatchObject(expectedState);
    });

    it('adds groups to new nodes', () => {
      const nodes = [
        {
          id: 'foo',
          groups: [
            {
              id: 'bar',
              name: 'bar',
            },
          ],
        },
      ];
      const groups = [
        {
          id: 'bar',
          name: 'bar',
        },
      ];
      const action = importSubgraph(nodes, undefined, groups);
      const initialState = {
        nodes: {},
        groups: {},
      };
      const expectedState = {
        nodes: {
          foo: {
            id: 'foo',
            groups: [
              {
                id: 'bar',
                name: 'bar',
              },
            ],
          },
        },
        groups: {
          bar: {
            id: 'bar',
            name: 'bar',
          },
        },
      };

      const state = reducer(initialState, action);

      expect(state).toMatchObject(expectedState);
    });

    it('adds new groups to existing nodes', () => {
      const nodes = [
        {
          id: 'foo',
          groups: [
            {
              id: 'bar',
              name: 'bar',
            },
          ],
        },
      ];
      const groups = [
        {
          id: 'bar',
          name: 'bar',
        },
      ];
      const action = importSubgraph(nodes, undefined, groups);
      const initialState = {
        nodes: {
          foo: {
            id: 'foo',
          },
        },
        groups: {},
      };
      const expectedState = {
        nodes: {
          foo: {
            id: 'foo',
            groups: [
              {
                id: 'bar',
                name: 'bar',
              },
            ],
          },
        },
        groups: {
          bar: {
            id: 'bar',
            name: 'bar',
          },
        },
      };

      const state = reducer(initialState, action);

      expect(state).toMatchObject(expectedState);
    });

    it('uses existing groups in new nodes', () => {
      const nodes = [
        {
          id: 'foo',
          groups: [
            {
              id: 'bar',
              name: 'bar',
            },
          ],
        },
      ];
      const groups = [
        {
          id: 'bar',
          name: 'bar',
        },
      ];
      const action = importSubgraph(nodes, undefined, groups);
      const initialState = {
        nodes: {},
        groups: {
          baz: {
            id: 'baz',
            name: 'bar',
          },
        },
      };
      const expectedState = {
        nodes: {
          foo: {
            id: 'foo',
            groups: [
              {
                id: 'baz',
                name: 'bar',
              },
            ],
          },
        },
        groups: {
          baz: {
            id: 'baz',
            name: 'bar',
          },
        },
      };

      const state = reducer(initialState, action);

      expect(state).toMatchObject(expectedState);
    });

    it('adds groups to links', () => {
      const links = [
        {
          id: 'foo',
          groups: [
            {
              id: 'bar',
              name: 'bar',
            },
          ],
        },
      ];
      const groups = [
        {
          id: 'bar',
          name: 'bar',
        },
      ];
      const action = importSubgraph(undefined, links, groups);
      const initialState = {
        links: {},
        groups: {},
      };
      const expectedState = {
        links: {
          foo: {
            id: 'foo',
            groups: [
              {
                id: 'bar',
                name: 'bar',
              },
            ],
          },
        },
        groups: {
          bar: {
            id: 'bar',
            name: 'bar',
          },
        },
      };

      const state = reducer(initialState, action);

      expect(state).toMatchObject(expectedState);
    });

    it('uses existing groups in new links', () => {
      const links = [
        {
          id: 'foo',
          groups: [
            {
              id: 'bar',
              name: 'bar',
            },
          ],
        },
      ];
      const groups = [
        {
          id: 'bar',
          name: 'bar',
        },
      ];
      const action = importSubgraph(undefined, links, groups);
      const initialState = {
        links: {},
        groups: {
          baz: {
            id: 'baz',
            name: 'bar',
          },
        },
      };
      const expectedState = {
        links: {
          foo: {
            id: 'foo',
            groups: [
              {
                id: 'baz',
                name: 'bar',
              },
            ],
          },
        },
        groups: {
          baz: {
            id: 'baz',
            name: 'bar',
          },
        },
      };

      const state = reducer(initialState, action);

      expect(state).toMatchObject(expectedState);
    });

    it('adds new groups to existing links', () => {
      const links = [
        {
          id: 'foo',
          source: 'bar',
          target: 'baz',
          groups: [
            {
              id: 'qux',
              name: 'qux',
            },
          ],
        },
      ];
      const groups = [
        {
          id: 'qux',
          name: 'qux',
          quux: 'corge',
        },
      ];
      const initialState = {
        links: {
          foo: {
            id: 'foo',
          },
        },
        groups: {},
      };
      const expectedState = {
        links: {
          foo: {
            id: 'foo',
            source: 'bar',
            target: 'baz',
            groups: [
              {
                id: 'qux',
                name: 'qux',
              },
            ],
          },
        },
        groups: {
          qux: {
            id: 'qux',
            name: 'qux',
          },
        },
      };
      const action = importSubgraph(undefined, links, groups);

      const state = reducer(initialState, action);

      expect(state).toMatchObject(expectedState);
    });

    it('uses existing nodes and preserves their properties', () => {
      const nodes = [
        {
          id: 'foo',
          groups: [
            {
              id: 'bar',
              name: 'bar',
            },
          ],
        },
      ];
      const groups = [
        {
          id: 'bar',
          name: 'bar',
        },
      ];
      const action = importSubgraph(nodes, undefined, groups);
      const initialState = {
        nodes: {
          foo: {
            id: 'foo',
            color: 'qux',
            groups: [
              {
                id: 'baz',
                name: 'baz',
              },
            ],
          },
        },
        groups: {
          baz: {
            id: 'baz',
            name: 'baz',
          },
        },
      };

      const state = reducer(initialState, action);
      expect(state.nodes).toEqual({
        foo: {
          id: 'foo',
          color: 'qux',
          groups: [
            {
              id: 'baz',
              name: 'baz',
            },
            {
              id: 'bar',
              name: 'bar',
            },
          ],
        },
      });
    });
  });
});
