import { getName, setNameGraph, GRAPH_SET_NAME, getNodesAsArray, getLinksAsArray, createGraph, GRAPH_CREATE } from './graph';
import reducer from './graph';

describe('graph', () => {
  describe('actions', () => {
    describe('setNameGraph', () => {
      it('creates the action with the `GRAPH_SET_NAME` type', () => {
        const action = setNameGraph();
        expect(action.type).toEqual(GRAPH_SET_NAME);
      });

      it('creates the payload provided', () => {
        const expectedPayload = 'foo';
        const action = setNameGraph(expectedPayload);
        const payload = action.payload;
        expect(payload).toEqual(expectedPayload);
      });
    });
    describe('createGraph', () => {
      it('creates the action with the `GRAPH_CREATE` type', () => {
        const action = createGraph();
        expect(action.type).toEqual(GRAPH_CREATE);
      });

      it('creates the payload provided', () => {
        const expectedPayload = 'foo';
        const action = createGraph(expectedPayload);
        const payload = action.payload;
        expect(payload).toEqual(expectedPayload);
      });
    });
  });

  describe('reducer', () => {
    describe('GRAPH_SET_NAME', () => {
      it('sets the `name` in the state to the payload of the given action', () => {
        const initialState = {
          name: undefined,
        };
        const expectedName = 'foo';
        const action = setNameGraph(expectedName);
        const state = reducer(initialState, action);
        expect(state.name).toEqual(expectedName);
      });
    });
  });

  describe('selectors', () => {
    describe('getName', () => {
      it('extracts `name` from the graph substate', () => {
        const expectedName = 'foo';
        const appState = {
          graph: {
            name: expectedName,
          },
        };
        const name = getName(appState);
        expect(name).toEqual(expectedName);
      });
    });

    describe('getNodesAsArray', () => {
      it('returns an empty array if there are no nodes', () => {
        const appState = {
          graph: {
            nodes: {},
          },
        };
        const nodes = getNodesAsArray(appState);
        expect(nodes).toEqual([]);
      });

      it('returns an array with all the nodes in the state', () => {
        const node1 = { bar: 'baz' };
        const node2 = { baz: 'qux' };
        const node3 = { qux: 'quux' };
        const appState = {
          graph: {
            nodes: {
              foo: node1,
              bar: node2,
              baz: node3,
            },
          },
        };
        const nodes = getNodesAsArray(appState);
        expect(nodes).toEqual([node1, node2, node3]);
      });
    });

    describe('getLinksAsArray', () => {
      it('returns an empty array if there are no links', () => {
        const appState = {
          graph: {
            links: {},
          },
        };
        const links = getLinksAsArray(appState);
        expect(links).toEqual([]);
      });

      it('returns an array with all the links in the state', () => {
        const link1 = { bar: 'baz' };
        const link2 = { baz: 'qux' };
        const link3 = { qux: 'quux' };
        const appState = {
          graph: {
            links: {
              foo: link1,
              bar: link2,
              baz: link3,
            },
          },
        };
        const links = getLinksAsArray(appState);
        expect(links).toEqual([link1, link2, link3]);
      });
    });
  });
});
