import { ADD_NODE_OPEN, ADD_NODE_CLOSE, openAddNode, closeAddNode, getIsOpen } from './add-node';
import reducer from './add-node';

describe('add-node', () => {
  describe('actions', () => {
    describe('openAddNode', () => {
      it('creates the action with the `ADD_NODE_OPEN` type', () => {
        const action = openAddNode();
        expect(action.type).toEqual(ADD_NODE_OPEN);
      });
    });

    describe('closeAddNode', () => {
      it('creates the action with the `ADD_NODE_CLOSE` type', () => {
        const action = closeAddNode();
        expect(action.type).toEqual(ADD_NODE_CLOSE);
      });
    });
  });

  describe('reducer', () => {
    describe('ADD_NODE_OPEN', () => {
      it('sets the `isOpen` flag to `true` ', () => {
        const initialState = {
          isOpen: false,
        };
        const action = openAddNode();
        const state = reducer(initialState, action);
        expect(state.isOpen).toBeTruthy();
      });
    });

    describe('ADD_NODE_CLOSE', () => {
      it('sets the `isOpen` flag to `false` ', () => {
        const initialState = {
          isOpen: true,
        };
        const action = closeAddNode();
        const state = reducer(initialState, action);
        expect(state.isOpen).toBeFalsy();
      });
    });
  });

  describe('selectors', () => {
    describe('getIsOpen', () => {
      it('extracts the `isOpen` from the add node substate', () => {
        const appState = {
          addNode: {
            isOpen: true,
          },
        };
        const isOpen = getIsOpen(appState);
        expect(isOpen).toBeTruthy();
      });
    });
  });
});
