import {
  getName,
  setNameGraph,
  GRAPH_SET_NAME,
  getNodesAsArray,
  getLinksAsArray,
  createGraph,
  GRAPH_CREATE,
  createNode,
  GRAPH_CREATE_NODE,
  createLink,
  GRAPH_CREATE_LINK,
} from './graph';
import reducer from './graph';
jest.mock('../services/links-service', () => ({
  __esModule: true,
  default: {
    getId: jest.fn(),
  },
}));

// eslint-disable-next-line import/first
import linksService from '../services/links-service';

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

    describe('createNode', () => {
      it('creates the action with the `GRAPH_CREATE_NODE` type', () => {
        const action = createNode();
        expect(action.type).toEqual(GRAPH_CREATE_NODE);
      });

      it('creates the payload provided', () => {
        const expectedPayload = 'foo';
        const action = createNode(expectedPayload);
        const payload = action.payload;
        expect(payload).toEqual(expectedPayload);
      });
    });

    describe('createLink', () => {
      it('creates the action with the `GRAPH_CREATE_LINK` type', () => {
        const action = createLink();
        expect(action.type).toEqual(GRAPH_CREATE_LINK);
      });

      it('creates the payload provided', () => {
        const expectedPayload = 'foo';
        const action = createNode(expectedPayload);
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

    describe('GRAPH_CREATE', () => {
      it('sets the `name` in the state to the payload of the given action and empties nodes and links', () => {
        const graphName = 'baz';
        const initialState = {
          name: undefined,
          nodes: {
            foo: 'bar',
          },
          links: {
            foo: 'bar',
          },
        };
        const expectedState = {
          name: graphName,
          nodes: {},
          links: {},
        };
        const action = createGraph(graphName);
        const state = reducer(initialState, action);
        expect(state).toEqual(expectedState);
      });
    });

    describe('GRAPH_CREATE_NODE', () => {
      it('adds the `node` in the payload to the state', () => {
        const node = {
          id: 'foo',
          foo: 'bar',
        };
        const initialState = {
          nodes: {},
        };
        const expectedState = {
          nodes: {
            foo: node,
          },
        };
        const action = createNode(node);
        const state = reducer(initialState, action);
        expect(state).toEqual(expectedState);
      });
    });

    describe('GRAPH_CREATE_LINK', () => {
      const linkId = 'corge';

      beforeEach(() => {
        linksService.getId.mockReturnValue(linkId);
      });

      afterEach(() => {
        jest.resetAllMocks();
      });

      it('adds the `link` in the payload to the state', () => {
        const link = {
          source: 'foo',
          target: 'bar',
        };
        const initialState = {
          links: {},
        };
        const expectedState = {
          links: {
            [linkId]: link,
          },
        };
        const action = createLink(link);
        const state = reducer(initialState, action);
        expect(state).toEqual(expectedState);
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
