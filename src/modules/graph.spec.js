import { select, takeLatest, call, put } from 'redux-saga/effects';
import { cloneableGenerator } from '@redux-saga/testing-utils';

// eslint-disable-next-line import/first
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
  saveGraphSaga,
  saveGraph,
  graphSelector,
  GRAPH_LOAD,
  loadGraph,
  GRAPH_LOAD_SUCCESS,
  loadGraphSuccess,
  loadGraphSaga,
  doLoadGraph,
  deleteNode,
  GRAPH_DELETE_NODE,
} from './graph';

// eslint-disable-next-line import/first
import reducer from './graph';
jest.mock('../services/links-service', () => ({
  __esModule: true,
  default: {
    getId: jest.fn(),
  },
}));

jest.mock('../services/graph-service', () => ({
  __esModule: true,
  default: {
    saveGraph: jest.fn(),
    removeGraph: jest.fn(),
    readGraph: jest.fn(),
  },
}));

jest.mock('../services/graph-names-service', () => ({
  __esModule: true,
  default: {
    saveGraphName: jest.fn(),
    removeGraphName: jest.fn(),
  },
}));

// eslint-disable-next-line import/first
import linksService from '../services/links-service';
// eslint-disable-next-line import/first
import graphService from '../services/graph-service';
// eslint-disable-next-line import/first
import graphNamesService from '../services/graph-names-service';

describe('graph', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

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

    describe(loadGraph.name, () => {
      it('creates the action with the `GRAPH_LOAD` type', () => {
        const action = loadGraph();
        expect(action.type).toEqual(GRAPH_LOAD);
      });

      it('creates the payload provided', () => {
        const expectedPayload = 'foo';
        const action = loadGraph(expectedPayload);
        const payload = action.payload;
        expect(payload).toEqual(expectedPayload);
      });
    });

    describe(loadGraphSuccess.name, () => {
      it('creates the action with the `GRAPH_LOAD_SUCCESS` type', () => {
        const action = loadGraphSuccess();
        expect(action.type).toEqual(GRAPH_LOAD_SUCCESS);
      });

      it('creates the payload provided', () => {
        const expectedPayload = 'foo';
        const action = loadGraphSuccess(expectedPayload);
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

    describe(deleteNode.name, () => {
      it('creates the action with the `GRAPH_DELETE_NODE` type', () => {
        const action = deleteNode();
        expect(action.type).toEqual(GRAPH_DELETE_NODE);
      });

      it('creates the payload provided', () => {
        const expectedPayload = 'foo';
        const action = deleteNode(expectedPayload);
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
          ...initialState,
          ...graph,
        });
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

    describe('GRAPH_DELETE_NODE', () => {
      it('sets the node identified by the payload to undefined', () => {
        const nodeId = 'foo';
        const initialState = {
          links: {},
          nodes: {
            [nodeId]: {
              id: 'foo',
            },
          },
        };
        const expectedState = {
          nodes: {},
        };
        const action = deleteNode(nodeId);
        const state = reducer(initialState, action);
        expect(state).toMatchObject(expectedState);
      });

      it("deletes all links which source is the action's payload", () => {
        const nodeId = 'foo';
        const initialState = {
          links: {
            'foo-bar': {
              source: 'foo',
              target: 'bar',
            },
            'bar-baz': {
              source: 'bar',
              target: 'baz',
            },
          },
        };
        const expectedState = {
          links: {
            'bar-baz': {
              source: 'bar',
              target: 'baz',
            },
          },
        };
        const action = deleteNode(nodeId);
        const state = reducer(initialState, action);
        expect(state).toMatchObject(expectedState);
      });

      it("deletes all links which target is the action's payload", () => {
        const nodeId = 'foo';
        const initialState = {
          links: {
            'bar-foo': {
              source: 'bar',
              target: 'foo',
            },
            'bar-baz': {
              source: 'bar',
              target: 'baz',
            },
          },
        };
        const expectedState = {
          links: {
            'bar-baz': {
              source: 'bar',
              target: 'baz',
            },
          },
        };
        const action = deleteNode(nodeId);
        const state = reducer(initialState, action);
        expect(state).toMatchObject(expectedState);
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

  describe('sagas', () => {
    describe(saveGraphSaga.name, () => {
      it('invokes take latest with `GRAPH_CREATE`, `GRAPH_SET_NAME`, `GRAPH_CREATE_NODE`, `GRAPH_CREATE_LINK`, `GRAPH_DELETE_NODE`', async () => {
        const action = setNameGraph('bar');
        const gen = cloneableGenerator(saveGraphSaga)(action);
        expect(gen.next().value).toEqual(
          takeLatest([GRAPH_CREATE, GRAPH_SET_NAME, GRAPH_CREATE_NODE, GRAPH_CREATE_LINK, GRAPH_DELETE_NODE], saveGraph)
        );
      });
    });

    describe('saveGraph', () => {
      it('selects using `graphSelector`', () => {
        const action = saveGraph('bar');
        let gen = cloneableGenerator(saveGraph)(action);
        expect(gen.next().value).toEqual(select(graphSelector));
      });

      it('calls `graphService.removeGraph`', () => {
        const action = saveGraph('bar');
        let gen = cloneableGenerator(saveGraph)(action);
        gen.next(); // select
        gen.next({ name: 'foo' }); // reduce
        expect(gen.next().value).toEqual(call([graphService, 'removeGraph'], 'foo'));
      });

      it('calls `graphService.saveGraph`', () => {
        const graph = { name: 'foo', nodes: { foo: 'bar' }, links: { bar: 'baz' } };
        const updatedGraph = { ...graph, name: 'bar' };
        const action = saveGraph('bar');
        let gen = cloneableGenerator(saveGraph)(action);
        gen.next(); // select
        gen.next(graph); // reduce
        gen.next(updatedGraph); // remove graph
        expect(gen.next().value).toEqual(call([graphService, 'saveGraph'], updatedGraph));
      });

      it('calls `graphNamesService.removeGraphName`', () => {
        const graph = { name: 'foo', nodes: { foo: 'bar' }, links: { bar: 'baz' } };
        const updatedGraph = { ...graph, name: 'bar' };
        const action = saveGraph('bar');
        let gen = cloneableGenerator(saveGraph)(action);
        gen.next(); // select
        gen.next(graph); // reduce
        gen.next(updatedGraph); // remove graph
        gen.next(); // save graph
        expect(gen.next().value).toEqual(call([graphNamesService, 'removeGraphName'], 'foo'));
      });

      it('calls `graphNamesService.saveGraphName`', () => {
        const graph = { name: 'foo', nodes: { foo: 'bar' }, links: { bar: 'baz' } };
        const updatedGraph = { ...graph, name: 'bar' };
        const action = saveGraph('bar');
        let gen = cloneableGenerator(saveGraph)(action);
        gen.next(); // select
        gen.next(graph); // reduce
        gen.next(updatedGraph); // remove graph
        gen.next(); // save graph
        gen.next(); // remove graph name
        expect(gen.next().value).toEqual(call([graphNamesService, 'saveGraphName'], 'bar'));
      });
    });

    describe(loadGraphSaga.name, () => {
      it('invokes take latest with `GRAPH_LOAD`', () => {
        const action = loadGraph('bar');
        const gen = cloneableGenerator(loadGraphSaga)(action);
        expect(gen.next().value).toEqual(takeLatest([GRAPH_LOAD], doLoadGraph));
      });
    });

    describe(doLoadGraph.name, () => {
      let action;

      beforeEach(() => {
        action = loadGraph('foo');
      });

      it('calls `graphService.readGraph` with the graph name provided in the action', () => {
        const gen = cloneableGenerator(doLoadGraph)(action);
        expect(gen.next().value).toEqual(call([graphService, 'readGraph'], action.payload));
      });

      it('puts a `loadGraphSuccess` action with the graph returned by `readGraph`', () => {
        const graph = { foo: 'bar' };
        const gen = cloneableGenerator(doLoadGraph)(action);
        gen.next();
        expect(gen.next(graph).value).toEqual(put(loadGraphSuccess(graph)));
      });
    });
  });
});
