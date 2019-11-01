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
  GRAPH_SET_CONTENTS,
  setContents,
  GRAPH_SET_TEXT,
  setText,
  GRAPH_SET_TEXT_ERROR,
  setTextError,
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

    it('includes the includeSampleGraph flag as provided', () => {
      const expectedGraph = { foo: 'bar', includeSampleGraph: true };
      const action = createGraph(expectedGraph, true);
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

  describe(setContents.name, () => {
    it('creates the action with the `GRAPH_SET_CONTENTS` type', () => {
      const action = setContents();
      expect(action.type).toEqual(GRAPH_SET_CONTENTS);
    });

    it('creates the action with the nodes, links and groups provided as payload', () => {
      const nodes = { foo: 'bar' };
      const links = { bar: 'baz' };
      const groups = { baz: 'qux' };
      const action = setContents(nodes, links, groups);
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

  describe(setTextError.name, () => {
    it('creates the action with the GRAPH_SET_TEXT_ERROR type', () => {
      const action = setTextError();
      expect(action.type).toEqual(GRAPH_SET_TEXT_ERROR);
    });

    it('creates the payload provided', () => {
      const payload = 'foo';
      const action = setTextError(payload);
      expect(action.payload).toEqual(payload);
    });
  });
});
