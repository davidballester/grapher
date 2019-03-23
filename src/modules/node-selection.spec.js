import {
  NODE_SELECTION_SELECT,
  NODE_SELECTION_DESELECT,
  selectNode,
  deselectNode,
  getSelectedNodes,
  getNonExistentLinkBetweenSelectedNodes,
} from './node-selection';
import reducer from './node-selection';
import linksService from '../services/links-service';
import { getLinks } from './graph';

jest.mock('./graph');

describe('node-selection', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('actions', () => {
    describe(selectNode.name, () => {
      it('creates the action with the `NODE_SELECTION_SELECT` type', () => {
        const action = selectNode();
        expect(action.type).toEqual(NODE_SELECTION_SELECT);
      });

      it('contains the given node as payload', () => {
        const node = { foo: 'bar' };
        const action = selectNode(node);
        expect(action.payload).toEqual(node);
      });
    });

    describe(deselectNode.name, () => {
      it('creates the action with the `NODE_SELECTION_DESELECT` type', () => {
        const action = deselectNode();
        expect(action.type).toEqual(NODE_SELECTION_DESELECT);
      });

      it('contains the given node ID as payload', () => {
        const nodeId = 'bar';
        const action = deselectNode(nodeId);
        expect(action.payload).toEqual(nodeId);
      });
    });
  });

  describe(reducer.name, () => {
    describe('NODE_SELECTION_SELECT', () => {
      it("adds the action's payload to the selected nodes array", () => {
        const node = { foo: 'bar' };
        const initialState = {
          selectedNodes: [],
        };
        const action = selectNode(node);
        const state = reducer(initialState, action);
        expect(state.selectedNodes).toEqual([node]);
      });

      it('deletes the first item of the `selectedNodes` array when a third node is added', () => {
        const node = { foo: 'bar' };
        const initialState = {
          selectedNodes: [{ bar: 'baz' }, { baz: 'qux' }],
        };
        const action = selectNode(node);
        const state = reducer(initialState, action);
        expect(state.selectedNodes).toEqual([{ baz: 'qux' }, { foo: 'bar' }]);
      });
    });

    describe('NODE_SELECTION_DESELECT', () => {
      it("deletes the node specified by the action's payload from the selected nodes array", () => {
        const initialState = {
          selectedNodes: [{ id: 'foo' }, { id: 'bar' }],
        };
        const action = deselectNode('foo');
        const state = reducer(initialState, action);
        expect(state.selectedNodes).toEqual([{ id: 'bar' }]);
      });
    });
  });

  describe('selectors', () => {
    describe(getSelectedNodes.name, () => {
      it('extracts the `selectedNodes` from nodeSelection the substate', () => {
        const node = { foo: 'bar' };
        const appState = {
          nodeSelection: {
            selectedNodes: [node],
          },
        };
        const selectedNodes = getSelectedNodes(appState);
        expect(selectedNodes).toEqual([node]);
      });
    });
  });

  describe(getNonExistentLinkBetweenSelectedNodes.name, () => {
    let getIdSpy;

    beforeEach(() => {
      getIdSpy = jest.spyOn(linksService, 'getId');
    });

    it('returns `undefined` if there are no selected nodes', () => {
      const response = getNonExistentLinkBetweenSelectedNodes({
        nodeSelection: {
          selectedNodes: undefined,
        },
      });
      expect(response).toBeUndefined();
    });

    it('returns `undefined` if there is fewer than 2 selected nodes', () => {
      const response = getNonExistentLinkBetweenSelectedNodes({
        nodeSelection: {
          selectedNodes: [{}],
        },
      });
      expect(response).toBeUndefined();
    });

    it('returns `undefined` if there is more than 2 selected nodes', () => {
      const response = getNonExistentLinkBetweenSelectedNodes({
        nodeSelection: {
          selectedNodes: [{}, {}, {}],
        },
      });
      expect(response).toBeUndefined();
    });

    it('returns `undefined` if there are 2 selected nodes and a link between the two', () => {
      getLinks.mockReturnValue({ foo: {} });
      getIdSpy.mockReturnValue('foo');
      const response = getNonExistentLinkBetweenSelectedNodes({
        nodeSelection: {
          selectedNodes: [{}, {}],
        },
      });
      expect(response).toBeUndefined();
    });

    it('returns a link from the first selected node to the second if there are no links between them', () => {
      getIdSpy.mockReturnValue('foo');
      const response = getNonExistentLinkBetweenSelectedNodes({
        nodeSelection: {
          selectedNodes: [{ id: 'baz' }, { id: 'qux' }],
        },
      });
      expect(response).toEqual({
        source: 'baz',
        target: 'qux',
      });
    });
  });
});
