import { EDIT_NODE_OPEN, EDIT_NODE_CLOSE, openEditNode, closeEditNode, getIsOpen, getNode } from './edit-node';
import reducer from './edit-node';

describe('edit-node', () => {
  describe('actions', () => {
    describe(openEditNode.name, () => {
      it('creates the action with the `EDIT_NODE_OPEN` type', () => {
        const action = openEditNode();
        expect(action.type).toEqual(EDIT_NODE_OPEN);
      });

      it('creates the action with the payload provided', () => {
        const payload = { foo: 'bar' };
        const action = openEditNode(payload);
        expect(action.payload).toEqual(payload);
      });
    });

    describe(closeEditNode.name, () => {
      it('creates the action with the `EDIT_NODE_CLOSE` type', () => {
        const action = closeEditNode();
        expect(action.type).toEqual(EDIT_NODE_CLOSE);
      });
    });
  });

  describe('reducer', () => {
    describe('EDIT_NODE_OPEN', () => {
      it('sets the `isOpen` flag to `true` ', () => {
        const initialState = {
          isOpen: false,
        };
        const action = openEditNode();
        const state = reducer(initialState, action);
        expect(state.isOpen).toBeTruthy();
      });
    });

    describe('EDIT_NODE_CLOSE', () => {
      it('sets the `isOpen` flag to `false` ', () => {
        const initialState = {
          isOpen: true,
        };
        const action = closeEditNode();
        const state = reducer(initialState, action);
        expect(state.isOpen).toBeFalsy();
      });
    });
  });

  describe('selectors', () => {
    describe(getIsOpen.name, () => {
      it('extracts the `isOpen` from the edit node substate', () => {
        const appState = {
          editNode: {
            isOpen: true,
          },
        };
        const isOpen = getIsOpen(appState);
        expect(isOpen).toBeTruthy();
      });
    });

    describe(getNode.name, () => {
      it('extracts the `node` from the edit node substate', () => {
        const appState = {
          editNode: {
            node: { foo: 'bar' },
          },
        };
        const node = getNode(appState);
        expect(node).toEqual(appState.editNode.node);
      });
    });
  });
});
