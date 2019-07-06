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
  createNode,
  GRAPH_CREATE_NODE,
  createLink,
  GRAPH_CREATE_LINK,
  GRAPH_LOAD,
  loadGraph,
  GRAPH_LOAD_SUCCESS,
  loadGraphSuccess,
  deleteNode,
  GRAPH_DELETE_NODE,
  deleteLink,
  GRAPH_DELETE_LINK,
  editNode,
  GRAPH_EDIT_NODE,
  GRAPH_DELETE,
  deleteGraph,
  GRAPH_EDIT_LINK,
  editLink,
  GRAPH_IMPORT_SUBGRAPH,
  importSubgraph,
  GRAPH_GROUPS_ADD,
  GRAPH_GROUPS_REMOVE,
  GRAPH_GROUPS_UPDATE,
  addGroup,
  removeGroup,
  updateGroup,
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

  describe(createNode.name, () => {
    it('creates the action with the `GRAPH_CREATE_NODE` type', () => {
      const action = createNode();
      expect(action.type).toEqual(GRAPH_CREATE_NODE);
    });

    it('includes the payload provided', () => {
      const expectedPayload = { foo: 'bar' };
      const action = createNode(expectedPayload);
      const payload = action.payload;
      expect(payload).toMatchObject(expectedPayload);
    });
  });

  describe('createLink', () => {
    it('creates the action with the `GRAPH_CREATE_LINK` type', () => {
      const action = createLink();
      expect(action.type).toEqual(GRAPH_CREATE_LINK);
    });

    it('creates the payload provided', () => {
      const expectedPayload = 'foo';
      const action = createLink(expectedPayload);
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

  describe(deleteLink.name, () => {
    it('creates the action with the `GRAPH_DELETE_LINK` type', () => {
      const action = deleteLink();
      expect(action.type).toEqual(GRAPH_DELETE_LINK);
    });

    it('creates the payload provided', () => {
      const expectedPayload = 'foo';
      const action = deleteLink(expectedPayload);
      const payload = action.payload;
      expect(payload).toEqual(expectedPayload);
    });
  });

  describe(editNode.name, () => {
    it('creates the action with the `GRAPH_EDIT_NODE` type', () => {
      const action = editNode();
      expect(action.type).toEqual(GRAPH_EDIT_NODE);
    });

    it('creates the payload provided', () => {
      const oldId = 'foo';
      const node = { foo: 'bar' };
      const action = editNode(oldId, node);
      const payload = action.payload;
      expect(payload).toEqual({ oldId, node });
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

  describe(editLink.name, () => {
    it('creates the action with the `GRAPH_EDIT_LINK` type', () => {
      const action = editLink();
      expect(action.type).toEqual(GRAPH_EDIT_LINK);
    });

    it('creates the action with the link provided as payload', () => {
      const link = { foo: 'bar' };
      const action = editLink(link);
      expect(action.payload).toEqual(link);
    });
  });

  describe(importSubgraph.name, () => {
    it('creates the action with the `GRAPH_IMPORT_SUBGRAPH` type', () => {
      const action = importSubgraph();
      expect(action.type).toEqual(GRAPH_IMPORT_SUBGRAPH);
    });

    it('creates the action with the nodes and links provided as payload', () => {
      const nodes = { foo: 'bar' };
      const links = { bar: 'baz' };
      const action = importSubgraph(nodes, links);
      expect(action.payload).toEqual({ nodes, links });
    });
  });

  describe(addGroup.name, () => {
    it('creates the action with GRAPH_GROUPS_ADD type', () => {
      const action = addGroup({});
      expect(action.type).toEqual(GRAPH_GROUPS_ADD);
    });

    it('assigns a random ID to the payload', () => {
      const action = addGroup({});
      expect(action.payload).toEqual(
        expect.objectContaining({
          id: 'uuid',
        })
      );
    });

    it('spreads the given group into the payload', () => {
      const group = { foo: 'bar' };
      const action = addGroup(group);
      expect(action.payload).toEqual(expect.objectContaining(group));
    });
  });

  describe(removeGroup.name, () => {
    it('creates the action with GRAPH_GROUPS_REMOVE type', () => {
      const action = removeGroup('foo');
      expect(action.type).toEqual(GRAPH_GROUPS_REMOVE);
    });

    it('creates the action with the given groupId as payload', () => {
      const action = removeGroup('foo');
      expect(action.payload).toEqual('foo');
    });
  });

  describe(updateGroup.name, () => {
    it('creates the action with GRAPH_GROUPS_UPDATE type', () => {
      const action = updateGroup({});
      expect(action.type).toEqual(GRAPH_GROUPS_UPDATE);
    });

    it('creates the action with the given group as payload', () => {
      const group = { foo: 'bar' };
      const action = updateGroup(group);
      expect(action.payload).toEqual(group);
    });
  });
});
