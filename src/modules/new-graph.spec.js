import { NEW_GRAPH_OPEN, NEW_GRAPH_CLOSE, openNewGraph, closeNewGraph, getIsOpen } from './new-graph';
import reducer from './new-graph';

describe('new-graph', () => {
  describe('actions', () => {
    describe('openNewGraph', () => {
      it('creates the action with the `NEW_GRAPH_OPEN` type', () => {
        const action = openNewGraph();
        expect(action.type).toEqual(NEW_GRAPH_OPEN);
      });
    });

    describe('closeNewGraph', () => {
      it('creates the action with the `NEW_GRAPH_CLOSE` type', () => {
        const action = closeNewGraph();
        expect(action.type).toEqual(NEW_GRAPH_CLOSE);
      });
    });
  });

  describe('reducer', () => {
    describe('NEW_GRAPH_OPEN', () => {
      it('sets the `isOpen` flag to `true` ', () => {
        const initialState = {
          isOpen: false,
        };
        const action = openNewGraph();
        const state = reducer(initialState, action);
        expect(state.isOpen).toBeTruthy();
      });
    });

    describe('NEW_GRAPH_CLOSE', () => {
      it('sets the `isOpen` flag to `false` ', () => {
        const initialState = {
          isOpen: true,
        };
        const action = closeNewGraph();
        const state = reducer(initialState, action);
        expect(state.isOpen).toBeFalsy();
      });
    });
  });

  describe('selectors', () => {
    describe('getIsOpen', () => {
      it('extracts the `isOpen` from the new graph substate', () => {
        const appState = {
          newGraph: {
            isOpen: true,
          },
        };
        const isOpen = getIsOpen(appState);
        expect(isOpen).toBeTruthy();
      });
    });
  });
});
