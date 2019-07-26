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
  GRAPH_GROUPS_ADD,
  addGroup,
  GRAPH_GROUPS_REMOVE,
  removeGroup,
  GRAPH_GROUPS_UPDATE,
  updateGroup,
} from './graph.actions';
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

  describe(GRAPH_GROUPS_ADD, () => {
    it('adds the group to the state', () => {
      const group = { foo: 'bar' };
      const action = addGroup(group);
      const state = reducer({ groups: {} }, action);
      expect(state).toEqual({
        groups: {
          uuid: expect.objectContaining(group),
        },
      });
    });
  });

  describe(GRAPH_GROUPS_REMOVE, () => {
    it('does nothing if the given group is not in the state', () => {
      const initialState = { groups: { bar: 'baz' }, nodes: {}, links: {} };
      const action = removeGroup('foo');
      const state = reducer(initialState, action);
      expect(state).toEqual(initialState);
    });

    it('removes the group identified by the action group ID', () => {
      const initialState = { groups: { bar: 'baz' }, nodes: {}, links: {} };
      const action = removeGroup('bar');
      const state = reducer(initialState, action);
      expect(state).toEqual({ groups: {}, nodes: {}, links: {} });
    });

    it('removes the group from the nodes that have it', () => {
      const initialState = {
        nodes: {
          foo: {
            id: 'foo',
            groups: [
              {
                id: 'bar',
              },
            ],
          },
        },
        links: {},
      };
      const action = removeGroup('bar');
      const state = reducer(initialState, action);
      expect(state).toMatchObject({
        nodes: {
          foo: {
            groups: [],
          },
        },
      });
    });

    it('does not affect groups not removed from the nodes', () => {
      const initialState = {
        nodes: {
          foo: {
            id: 'foo',
            groups: [
              {
                id: 'bar',
              },
            ],
          },
        },
        links: {},
      };
      const action = removeGroup('baz');
      const state = reducer(initialState, action);
      expect(state).toMatchObject({
        nodes: {
          foo: {
            groups: [
              {
                id: 'bar',
              },
            ],
          },
        },
      });
    });

    it('removes the group from the links that have it', () => {
      const initialState = {
        links: {
          foo: {
            id: 'foo',
            groups: [
              {
                id: 'bar',
              },
            ],
          },
        },
        nodes: {},
      };
      const action = removeGroup('bar');
      const state = reducer(initialState, action);
      expect(state).toMatchObject({
        links: {
          foo: {
            groups: [],
          },
        },
      });
    });

    it('does not affect groups not removed from the links', () => {
      const initialState = {
        links: {
          foo: {
            id: 'foo',
            groups: [
              {
                id: 'bar',
              },
            ],
          },
        },
        nodes: {},
      };
      const action = removeGroup('baz');
      const state = reducer(initialState, action);
      expect(state).toMatchObject({
        links: {
          foo: {
            groups: [
              {
                id: 'bar',
              },
            ],
          },
        },
      });
    });
  });

  describe(GRAPH_GROUPS_UPDATE, () => {
    it('sets the group to the state', () => {
      const group = { id: 'uuid', foo: 'bar' };
      const action = updateGroup(group);
      const state = reducer({ groups: {}, nodes: {}, links: {} }, action);
      expect(state).toEqual({
        groups: { uuid: group },
        nodes: {},
        links: {},
      });
    });

    it('replaces the group in the nodes that have it', () => {
      const group = { id: 'uuid', foo: 'bar' };
      const initialState = {
        nodes: {
          foo: {
            id: 'foo',
            groups: [
              {
                id: 'uuid',
                bar: 'foo',
              },
            ],
          },
        },
        links: {},
      };
      const action = updateGroup(group);
      const state = reducer(initialState, action);
      expect(state).toMatchObject({
        nodes: {
          foo: {
            groups: [
              {
                id: 'uuid',
                foo: 'bar',
              },
            ],
          },
        },
      });
    });

    it('does not affect groups not updated from the nodes', () => {
      const group = { id: 'uuid', foo: 'bar' };
      const initialState = {
        nodes: {
          foo: {
            id: 'foo',
            groups: [
              {
                id: 'bar',
              },
            ],
          },
        },
        links: {},
      };
      const action = updateGroup(group);
      const state = reducer(initialState, action);
      expect(state).toMatchObject({
        nodes: {
          foo: {
            groups: [
              {
                id: 'bar',
              },
            ],
          },
        },
      });
    });

    it('replaces the group in the links that have it', () => {
      const group = { id: 'uuid', foo: 'bar' };
      const initialState = {
        links: {
          foo: {
            id: 'foo',
            groups: [
              {
                id: 'uuid',
                bar: 'foo',
              },
            ],
          },
        },
        nodes: {},
      };
      const action = updateGroup(group);
      const state = reducer(initialState, action);
      expect(state).toMatchObject({
        links: {
          foo: {
            groups: [
              {
                id: 'uuid',
                foo: 'bar',
              },
            ],
          },
        },
      });
    });

    it('does not affect groups not updated from the links', () => {
      const group = { id: 'uuid', foo: 'bar' };
      const initialState = {
        links: {
          foo: {
            id: 'foo',
            groups: [
              {
                id: 'bar',
              },
            ],
          },
        },
        nodes: {},
      };
      const action = updateGroup(group);
      const state = reducer(initialState, action);
      expect(state).toMatchObject({
        links: {
          foo: {
            groups: [
              {
                id: 'bar',
              },
            ],
          },
        },
      });
    });
  });
});
