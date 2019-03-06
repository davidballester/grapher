import { NEW_NODE_OPEN, NEW_NODE_CLOSE, openNewNode, closeNewNode, getIsOpen } from './new-node';
import reducer from './new-node';

describe('add-node', () => {
  describe('actions', () => {
    describe('openNewNode', () => {
      it('creates the action with the `NEW_NODE_OPEN` type', () => {
        const action = openNewNode();
        expect(action.type).toEqual(NEW_NODE_OPEN);
      });
    });

    describe('closeNewNode', () => {
      it('creates the action with the `NEW_NODE_CLOSE` type', () => {
        const action = closeNewNode();
        expect(action.type).toEqual(NEW_NODE_CLOSE);
      });
    });
  });

  describe('reducer', () => {
    describe('NEW_NODE_OPEN', () => {
      it('sets the `isOpen` flag to `true` ', () => {
        const initialState = {
          isOpen: false,
        };
        const action = openNewNode();
        const state = reducer(initialState, action);
        expect(state.isOpen).toBeTruthy();
      });
    });

    describe('NEW_NODE_CLOSE', () => {
      it('sets the `isOpen` flag to `false` ', () => {
        const initialState = {
          isOpen: true,
        };
        const action = closeNewNode();
        const state = reducer(initialState, action);
        expect(state.isOpen).toBeFalsy();
      });
    });
  });

  describe('selectors', () => {
    describe('getIsOpen', () => {
      it('extracts the `isOpen` from the add node substate', () => {
        const appState = {
          newNode: {
            isOpen: true,
          },
        };
        const isOpen = getIsOpen(appState);
        expect(isOpen).toBeTruthy();
      });
    });
  });
});
