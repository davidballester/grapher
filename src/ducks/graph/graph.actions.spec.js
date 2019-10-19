/* eslint-disable import/first */
jest.mock('uuid/v4', () => ({
  __esModule: true,
  default: () => 'uuid',
}));

import {
  setGraphName,
  GRAPH_SET_NAME,
  createGraph,
  GRAPH_CREATE,
  GRAPH_LOAD,
  loadGraph,
  GRAPH_LOAD_SUCCESS,
  loadGraphSuccess,
  GRAPH_DELETE,
  deleteGraph,
  GRAPH_IMPORT_SUBGRAPH,
  importSubgraph,
  GRAPH_SET_TEXT,
  setText,
} from './graph.actions';

describe('actions', () => {
  describe('setGraphName', () => {
    it('creates the action with the `GRAPH_SET_NAME` type', () => {
      const action = setGraphName();
      expect(action.type).toEqual(GRAPH_SET_NAME);
    });

    it('creates the payload provided', () => {
      const id = 'foo';
      const name = 'bar';
      const action = setGraphName(id, name);
      const payload = action.payload;
      expect(payload).toEqual({ id, name });
    });
  });

  describe(createGraph.name, () => {
    it('creates the action with the `GRAPH_CREATE` type', () => {
      const action = createGraph();
      expect(action.type).toEqual(GRAPH_CREATE);
    });

    it('includes the graph provided', () => {
      const expectedGraph = { foo: 'bar' };
      const action = createGraph(expectedGraph);
      expect(action.payload).toMatchObject(expectedGraph);
    });

    it('includes an uuid as id, regardless of the contents of the payload', () => {
      const action = createGraph({ id: 'foo' });
      const payload = action.payload;
      expect(payload.id).toEqual('uuid');
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

  describe(deleteGraph.name, () => {
    it('creates the action with the `GRAPH_DELETE` type', () => {
      const action = deleteGraph();
      expect(action.type).toEqual(GRAPH_DELETE);
    });

    it('creates the payload provided', () => {
      const payload = 'foo';
      const action = deleteGraph(payload);
      expect(action.payload).toEqual(payload);
    });
  });

  describe(importSubgraph.name, () => {
    it('creates the action with the `GRAPH_IMPORT_SUBGRAPH` type', () => {
      const action = importSubgraph();
      expect(action.type).toEqual(GRAPH_IMPORT_SUBGRAPH);
    });

    it('creates the action with the nodes, links and groups provided as payload', () => {
      const nodes = { foo: 'bar' };
      const links = { bar: 'baz' };
      const groups = { baz: 'qux' };
      const action = importSubgraph(nodes, links, groups);
      expect(action.payload).toEqual({ nodes, links, groups });
    });
  });

  describe(setText.name, () => {
    it('creates the action with the `GRAPH_SET_TEXT` type', () => {
      const action = setText();
      expect(action.type).toEqual(GRAPH_SET_TEXT);
    });

    it('creates the payload provided', () => {
      const payload = 'foo';
      const action = setText(payload);
      expect(action.payload).toEqual(payload);
    });
  });
});
