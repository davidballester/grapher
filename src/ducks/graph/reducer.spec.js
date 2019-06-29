/* eslint-disable import/first */
jest.mock('uuid/v4', () => ({
  __esModule: true,
  default: () => 'uuid',
}));

jest.mock('../../services/links.service', () => ({
  __esModule: true,
  default: {
    getId: jest.fn(),
  },
}));
import linksService from '../../services/links.service';
import {
  setGraphName,
  createGraph,
  createNode,
  createLink,
  loadGraphSuccess,
  deleteNode,
  deleteLink,
  editNode,
  editLink,
  importSubgraph,
} from './actions';
import reducer from './reducer';

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
      };
      const expectedState = {
        id: 'uuid',
        name: '',
        nodes: {},
        links: {},
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
      expect(state).toMatchObject(expectedState);
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
          [linkId]: {
            id: linkId,
            label: linkId,
            ...link,
          },
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

  describe('GRAPH_DELETE_LINK', () => {
    it('deletes the link identified by the payload', () => {
      const linkId = 'foo';
      const initialState = {
        links: {
          [linkId]: {
            id: linkId,
          },
        },
      };
      const expectedState = {
        links: {},
      };
      const action = deleteLink(linkId);
      const state = reducer(initialState, action);
      expect(state).toMatchObject(expectedState);
    });
  });

  describe('GRAPH_EDIT_NODE', () => {
    it('substitutes the node with the new one', () => {
      const initialState = {
        nodes: {
          foo: { id: 'foo' },
        },
        links: {},
      };
      const expectedState = {
        nodes: {
          bar: { id: 'bar' },
        },
        links: {},
      };
      const action = editNode('foo', { id: 'bar' });
      const state = reducer(initialState, action);
      expect(state).toEqual(expectedState);
    });

    it('does not delete the node if the ID does not change', () => {
      const initialState = {
        nodes: {
          foo: { id: 'foo', bar: 'baz' },
        },
        links: {},
      };
      const expectedState = {
        nodes: {
          foo: { id: 'foo', baz: 'qux' },
        },
        links: {},
      };
      const action = editNode('foo', { id: 'foo', baz: 'qux' });
      const state = reducer(initialState, action);
      expect(state).toEqual(expectedState);
    });

    it('replaces the node ID in existing links', () => {
      const initialState = {
        nodes: {},
        links: {
          'foo-bar': {
            id: 'foo-bar',
            source: 'foo',
            target: 'bar',
          },
        },
      };
      const expectedState = {
        nodes: {
          baz: { id: 'baz' },
        },
        links: {
          'baz-bar': {
            id: 'baz-bar',
            source: 'baz',
            target: 'bar',
          },
        },
      };
      linksService.getId.mockReturnValue('baz-bar');

      const action = editNode('foo', { id: 'baz' });
      const state = reducer(initialState, action);
      expect(state).toEqual(expectedState);
    });

    it('does not modify the links if the node ID does not change', () => {
      const initialState = {
        nodes: {},
        links: {
          'foo-bar': {
            id: 'foo-bar',
            source: 'foo',
            target: 'bar',
          },
        },
      };
      const expectedState = {
        nodes: {
          foo: { id: 'foo' },
        },
        links: {
          'foo-bar': {
            id: 'foo-bar',
            source: 'foo',
            target: 'bar',
          },
        },
      };
      linksService.getId.mockReturnValue('foo-bar');

      const action = editNode('foo', { id: 'foo' });
      const state = reducer(initialState, action);
      expect(state).toEqual(expectedState);
    });
  });

  describe('GRAPH_EDIT_LINK', () => {
    it('modifies the link in the action payload within the state', () => {
      const link = { id: 'foo', baz: 'qux' };
      const initialState = {
        links: {
          foo: { id: 'foo', bar: 'baz' },
        },
      };
      const expectedState = {
        links: {
          foo: link,
        },
      };
      const action = editLink(link);
      const state = reducer(initialState, action);
      expect(state).toEqual(expectedState);
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
          },
        },
      };

      const state = reducer(initialState, action);

      expect(state).toMatchObject(expectedState);
    });
  });
});
