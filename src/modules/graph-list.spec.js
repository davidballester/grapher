import { GRAPH_LIST_OPEN, GRAPH_LIST_CLOSE, openGraphList, closeGraphList, getIsOpen } from './graph-list';
import reducer from './graph-list';

describe('graph-list', () => {
  describe('actions', () => {
    describe('openGraphList', () => {
      it('creates the action with the `GRAPH_LIST_OPEN` type', () => {
        const action = openGraphList();
        expect(action.type).toEqual(GRAPH_LIST_OPEN);
      });
    });

    describe('closeGraphList', () => {
      it('creates the action with the `GRAPH_LIST_CLOSE` type', () => {
        const action = closeGraphList();
        expect(action.type).toEqual(GRAPH_LIST_CLOSE);
      });
    });
  });

  describe('reducer', () => {
    describe('GRAPH_LIST_OPEN', () => {
      it('sets the `isOpen` flag to `true` ', () => {
        const initialState = {
          isOpen: false,
        };
        const action = openGraphList();
        const state = reducer(initialState, action);
        expect(state.isOpen).toBeTruthy();
      });
    });

    describe('GRAPH_LIST_CLOSE', () => {
      it('sets the `isOpen` flag to `false` ', () => {
        const initialState = {
          isOpen: true,
        };
        const action = closeGraphList();
        const state = reducer(initialState, action);
        expect(state.isOpen).toBeFalsy();
      });
    });
  });

  describe('selectors', () => {
    describe('getIsOpen', () => {
      it('extracts the `isOpen` from the graphs list substate', () => {
        const appState = {
          graphList: {
            isOpen: true,
          },
        };
        const isOpen = getIsOpen(appState);
        expect(isOpen).toBeTruthy();
      });
    });
  });
});
