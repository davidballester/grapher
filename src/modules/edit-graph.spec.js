import reducer, { EDIT_GRAPH_OPEN, EDIT_GRAPH_CLOSE, openEditGraph, closeEditGraph, getIsOpen } from './edit-graph';

describe('edit-graph', () => {
  describe('actions', () => {
    describe(openEditGraph.name, () => {
      it('creates the action with the `EDIT_GRAPH_OPEN` type', () => {
        const action = openEditGraph();
        expect(action.type).toEqual(EDIT_GRAPH_OPEN);
      });
    });

    describe(closeEditGraph.name, () => {
      it('creates the action with the `EDIT_GRAPH_CLOSE` type', () => {
        const action = closeEditGraph();
        expect(action.type).toEqual(EDIT_GRAPH_CLOSE);
      });
    });
  });

  describe('reducer', () => {
    describe('EDIT_GRAPH_OPEN', () => {
      it('sets the `isOpen` flag to `true` ', () => {
        const initialState = {
          isOpen: false,
        };
        const action = openEditGraph();
        const state = reducer(initialState, action);
        expect(state.isOpen).toBeTruthy();
      });
    });

    describe('EDIT_GRAPH_CLOSE', () => {
      it('sets the `isOpen` flag to `false` ', () => {
        const initialState = {
          isOpen: true,
        };
        const action = closeEditGraph();
        const state = reducer(initialState, action);
        expect(state.isOpen).toBeFalsy();
      });
    });
  });

  describe('selectors', () => {
    describe(getIsOpen.name, () => {
      it('extracts the `isOpen` from the add node substate', () => {
        const appState = {
          editGraph: {
            isOpen: true,
          },
        };
        const isOpen = getIsOpen(appState);
        expect(isOpen).toBeTruthy();
      });
    });
  });
});
