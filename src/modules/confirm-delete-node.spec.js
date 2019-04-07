import reducer, {
  CONFIRM_DELETE_NODE_OPEN,
  CONFIRM_DELETE_NODE_CLOSE,
  openConfirmDeleteNode,
  closeConfirmDeleteNode,
  getIsOpen,
  getNodeIds,
} from './confirm-delete-node';

describe('confirm-delete-node', () => {
  describe('actions', () => {
    describe(openConfirmDeleteNode.name, () => {
      it('creates the action with the `CONFIRM_DELETE_NODE_OPEN` type', () => {
        const action = openConfirmDeleteNode();
        expect(action.type).toEqual(CONFIRM_DELETE_NODE_OPEN);
      });

      it('creates the action with the payload provided', () => {
        const expectedPayload = 'foo';
        const action = openConfirmDeleteNode(expectedPayload);
        const payload = action.payload;
        expect(payload).toEqual(expectedPayload);
      });
    });

    describe(closeConfirmDeleteNode.name, () => {
      it('creates the action with the `CONFIRM_DELETE_NODE_CLOSE` type', () => {
        const action = closeConfirmDeleteNode();
        expect(action.type).toEqual(CONFIRM_DELETE_NODE_CLOSE);
      });
    });
  });

  describe('reducer', () => {
    describe('CONFIRM_DELETE_NODE_OPEN', () => {
      it('sets the `isOpen` flag to `true` ', () => {
        const initialState = {
          isOpen: false,
        };
        const action = openConfirmDeleteNode();
        const state = reducer(initialState, action);
        expect(state.isOpen).toBeTruthy();
      });
    });

    describe('CONFIRM_DELETE_NODE_CLOSE', () => {
      it('sets the `isOpen` flag to `false` ', () => {
        const initialState = {
          isOpen: true,
        };
        const action = closeConfirmDeleteNode();
        const state = reducer(initialState, action);
        expect(state.isOpen).toBeFalsy();
      });
    });
  });

  describe('selectors', () => {
    describe(getIsOpen.name, () => {
      it('extracts the `isOpen` from the state', () => {
        const appState = {
          confirmDeleteNode: {
            isOpen: true,
          },
        };
        const isOpen = getIsOpen(appState);
        expect(isOpen).toBeTruthy();
      });
    });

    describe(getNodeIds.name, () => {
      it('extracts the `nodeIds` from the state', () => {
        const appState = {
          confirmDeleteNode: {
            nodeIds: ['foo'],
          },
        };
        const isOpen = getNodeIds(appState);
        expect(isOpen).toEqual(appState.confirmDeleteNode.nodeIds);
      });
    });
  });
});
