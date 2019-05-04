import { EDIT_LINK_OPEN, EDIT_LINK_CLOSE, openEditLink, closeEditLink, getIsOpen, getLink } from './edit-link';
import reducer from './edit-link';

describe('edit-link', () => {
  describe('actions', () => {
    describe(openEditLink.name, () => {
      it('creates the action with the `EDIT_LINK_OPEN` type', () => {
        const action = openEditLink();
        expect(action.type).toEqual(EDIT_LINK_OPEN);
      });

      it('creates the action with the payload provided', () => {
        const payload = { foo: 'bar' };
        const action = openEditLink(payload);
        expect(action.payload).toEqual(payload);
      });
    });

    describe(closeEditLink.name, () => {
      it('creates the action with the `EDIT_LINK_CLOSE` type', () => {
        const action = closeEditLink();
        expect(action.type).toEqual(EDIT_LINK_CLOSE);
      });
    });
  });

  describe('reducer', () => {
    describe('EDIT_LINK_OPEN', () => {
      it('sets the `isOpen` flag to `true` ', () => {
        const initialState = {
          isOpen: false,
        };
        const action = openEditLink();
        const state = reducer(initialState, action);
        expect(state.isOpen).toBeTruthy();
      });
    });

    describe('EDIT_LINK_CLOSE', () => {
      it('sets the `isOpen` flag to `false` ', () => {
        const initialState = {
          isOpen: true,
        };
        const action = closeEditLink();
        const state = reducer(initialState, action);
        expect(state.isOpen).toBeFalsy();
      });
    });
  });

  describe('selectors', () => {
    describe(getIsOpen.name, () => {
      it('extracts the `isOpen` from the edit link substate', () => {
        const appState = {
          editLink: {
            isOpen: true,
          },
        };
        const isOpen = getIsOpen(appState);
        expect(isOpen).toBeTruthy();
      });
    });

    describe(getLink.name, () => {
      it('extracts the `link` from the edit link substate', () => {
        const appState = {
          editLink: {
            link: { foo: 'bar' },
          },
        };
        const link = getLink(appState);
        expect(link).toEqual(appState.editLink.link);
      });
    });
  });
});
