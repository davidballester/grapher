import reducer, {
  CONFIRM_DELETE_GRAPH_OPEN,
  CONFIRM_DELETE_GRAPH_CLOSE,
  openConfirmDeleteGraph,
  closeConfirmDeleteGraph,
  getIsOpen,
  getGraphName,
} from './confirm-delete-graph';

describe('confirm-delete-graph', () => {
  describe('actions', () => {
    describe(openConfirmDeleteGraph.name, () => {
      it('creates the action with the `CONFIRM_DELETE_GRAPH_OPEN` type', () => {
        const action = openConfirmDeleteGraph();
        expect(action.type).toEqual(CONFIRM_DELETE_GRAPH_OPEN);
      });

      it('creates the action with the payload provided', () => {
        const expectedPayload = 'foo';
        const action = openConfirmDeleteGraph(expectedPayload);
        const payload = action.payload;
        expect(payload).toEqual(expectedPayload);
      });
    });

    describe(closeConfirmDeleteGraph.name, () => {
      it('creates the action with the `CONFIRM_DELETE_GRAPH_CLOSE` type', () => {
        const action = closeConfirmDeleteGraph();
        expect(action.type).toEqual(CONFIRM_DELETE_GRAPH_CLOSE);
      });
    });
  });

  describe('reducer', () => {
    describe('CONFIRM_DELETE_GRAPH_OPEN', () => {
      it('sets the `isOpen` flag to `true` ', () => {
        const initialState = {
          isOpen: false,
        };
        const action = openConfirmDeleteGraph();
        const state = reducer(initialState, action);
        expect(state.isOpen).toBeTruthy();
      });
    });

    describe('CONFIRM_DELETE_GRAPH_CLOSE', () => {
      it('sets the `isOpen` flag to `false` ', () => {
        const initialState = {
          isOpen: true,
        };
        const action = closeConfirmDeleteGraph();
        const state = reducer(initialState, action);
        expect(state.isOpen).toBeFalsy();
      });
    });
  });

  describe('selectors', () => {
    describe(getIsOpen.name, () => {
      it('extracts the `isOpen` from the state', () => {
        const appState = {
          confirmDeleteGraph: {
            isOpen: true,
          },
        };
        const isOpen = getIsOpen(appState);
        expect(isOpen).toBeTruthy();
      });
    });

    describe(getGraphName.name, () => {
      it('extracts the `graphName` from the state', () => {
        const appState = {
          confirmDeleteGraph: {
            graphName: 'foo',
          },
        };
        const graphName = getGraphName(appState);
        expect(graphName).toEqual(appState.confirmDeleteGraph.graphName);
      });
    });
  });
});
