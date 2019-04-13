import reducer, {
  CONFIRM_DELETE_LINK_OPEN,
  CONFIRM_DELETE_LINK_CLOSE,
  openConfirmDeleteLink,
  closeConfirmDeleteLink,
  getIsOpen,
  getLinkId,
} from './confirm-delete-link';

describe('confirm-delete-link', () => {
  describe('actions', () => {
    describe(openConfirmDeleteLink.name, () => {
      it('creates the action with the `CONFIRM_DELETE_LINK_OPEN` type', () => {
        const action = openConfirmDeleteLink();
        expect(action.type).toEqual(CONFIRM_DELETE_LINK_OPEN);
      });

      it('creates the action with the payload provided', () => {
        const expectedPayload = 'foo';
        const action = openConfirmDeleteLink(expectedPayload);
        const payload = action.payload;
        expect(payload).toEqual(expectedPayload);
      });
    });

    describe(closeConfirmDeleteLink.name, () => {
      it('creates the action with the `CONFIRM_DELETE_LINK_CLOSE` type', () => {
        const action = closeConfirmDeleteLink();
        expect(action.type).toEqual(CONFIRM_DELETE_LINK_CLOSE);
      });
    });
  });

  describe('reducer', () => {
    describe('CONFIRM_DELETE_LINK_OPEN', () => {
      it('sets the `isOpen` flag to `true` ', () => {
        const initialState = {
          isOpen: false,
        };
        const action = openConfirmDeleteLink();
        const state = reducer(initialState, action);
        expect(state.isOpen).toBeTruthy();
      });
    });

    describe('CONFIRM_DELETE_LINK_CLOSE', () => {
      it('sets the `isOpen` flag to `false` ', () => {
        const initialState = {
          isOpen: true,
        };
        const action = closeConfirmDeleteLink();
        const state = reducer(initialState, action);
        expect(state.isOpen).toBeFalsy();
      });
    });
  });

  describe('selectors', () => {
    describe(getIsOpen.name, () => {
      it('extracts the `isOpen` from the state', () => {
        const appState = {
          confirmDeleteLink: {
            isOpen: true,
          },
        };
        const isOpen = getIsOpen(appState);
        expect(isOpen).toBeTruthy();
      });
    });

    describe(getLinkId.name, () => {
      it('extracts the `linkId` from the state', () => {
        const appState = {
          confirmDeleteLink: {
            linkId: 'foo',
          },
        };
        const linkId = getLinkId(appState);
        expect(linkId).toEqual(appState.confirmDeleteLink.linkId);
      });
    });
  });
});
