import { NODE_SELECTION_SELECT, NODE_SELECTION_DESELECT, selectNode, deselectNode, getSelectedNode } from './node-selection';
import reducer from './node-selection';

describe('node-selection', () => {
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
    });
  });

  describe(reducer.name, () => {
    describe('NODE_SELECTION_SELECT', () => {
      it("sets the `selectedNode` to the action's payload", () => {
        const node = { foo: 'bar' };
        const initialState = {
          selectedNode: undefined,
        };
        const action = selectNode(node);
        const state = reducer(initialState, action);
        expect(state.selectedNode).toEqual(node);
      });
    });

    describe('NODE_SELECTION_DESELECT', () => {
      it('sets the `selectedNode` to undefined', () => {
        const initialState = {
          selectedNode: { foo: 'bar' },
        };
        const action = deselectNode();
        const state = reducer(initialState, action);
        expect(state.selectedNode).toBeUndefined();
      });
    });
  });

  describe('selectors', () => {
    describe(getSelectedNode.name, () => {
      it('extracts the `selectedNode` from nodeSelection the substate', () => {
        const node = { foo: 'bar' };
        const appState = {
          nodeSelection: {
            selectedNode: node,
          },
        };
        const selectedNode = getSelectedNode(appState);
        expect(selectedNode).toEqual(node);
      });
    });
  });
});
