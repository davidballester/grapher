import reducer, { DIALOG_OPEN, DIALOG_CLOSE, openDialog, closeDialog, getIsOpen, getMetadata } from './dialog.duck';

describe('dialog', () => {
  describe('actions', () => {
    describe(openDialog.name, () => {
      it('creates the action with the `DIALOG_OPEN` type', () => {
        const action = openDialog();
        expect(action.type).toEqual(DIALOG_OPEN);
      });

      it('sets the dialogId and the metadata supplied as payload', () => {
        const dialogId = 'foo';
        const metadata = { foo: 'bar' };
        const action = openDialog(dialogId, metadata);
        expect(action.payload).toEqual({ dialogId, metadata });
      });
    });

    describe(closeDialog.name, () => {
      it('creates the action with the `DIALOG_CLOSE` type', () => {
        const action = closeDialog();
        expect(action.type).toEqual(DIALOG_CLOSE);
      });

      it('sets as payload the provided dialogId', () => {
        const dialogId = 'foo';
        const action = closeDialog(dialogId);
        expect(action.payload).toEqual(dialogId);
      });
    });
  });

  describe('reducer', () => {
    const dialogId = 'foo';

    describe('DIALOG_OPEN', () => {
      it('sets the dialog `isOpen` to `true` if nothing was set yet', () => {
        const initialState = {};
        const expectedState = {
          [dialogId]: {
            isOpen: true,
          },
        };
        const action = openDialog(dialogId);
        const state = reducer(initialState, action);
        expect(state).toEqual(expectedState);
      });

      it('sets the dialog status to `true` if it was false', () => {
        const initialState = {
          [dialogId]: {
            isOpen: false,
          },
        };
        const expectedState = {
          [dialogId]: {
            isOpen: true,
          },
        };
        const action = openDialog(dialogId);
        const state = reducer(initialState, action);
        expect(state).toEqual(expectedState);
      });

      it('sets the metadata in the state', () => {
        const metadata = {
          foo: 'bar',
        };
        const initialState = {};
        const expectedState = {
          [dialogId]: {
            isOpen: true,
            metadata,
          },
        };
        const action = openDialog(dialogId, metadata);
        const state = reducer(initialState, action);
        expect(state).toEqual(expectedState);
      });
    });

    describe('DIALOG_CLOSE', () => {
      it('sets the dialog `isOpen` to `false` if nothing was set yet', () => {
        const initialState = {};
        const expectedState = {
          [dialogId]: {
            isOpen: false,
          },
        };
        const action = closeDialog(dialogId);
        const state = reducer(initialState, action);
        expect(state).toEqual(expectedState);
      });

      it('sets the dialog status to `false` if it was true', () => {
        const initialState = {
          [dialogId]: {
            isOpen: true,
          },
        };
        const expectedState = {
          [dialogId]: {
            isOpen: false,
          },
        };
        const action = closeDialog(dialogId);
        const state = reducer(initialState, action);
        expect(state).toEqual(expectedState);
      });
    });
  });

  describe('selectors', () => {
    describe(getIsOpen.name, () => {
      const dialogId = 'foo';

      it('gets the `isOpen` of the provided dialog', () => {
        const appState = {
          dialog: {
            [dialogId]: {
              isOpen: true,
            },
          },
        };
        const isOpen = getIsOpen(appState, dialogId);
        expect(isOpen).toBeTruthy();
      });

      it('returns `false` if there is no value defined for the specified dialog', () => {
        const appState = {
          dialog: {},
        };
        const isOpen = getIsOpen(appState, dialogId);
        expect(isOpen).toBeFalsy();
      });
    });

    describe(getMetadata.name, () => {
      const dialogId = 'foo';

      it('gets the `metadata` of the provided dialog', () => {
        const expectedMetadata = { foo: 'bar' };
        const appState = {
          dialog: {
            [dialogId]: {
              metadata: expectedMetadata,
            },
          },
        };
        const metadata = getMetadata(appState, dialogId);
        expect(metadata).toEqual(expectedMetadata);
      });

      it('returns `undefined` if there is no value defined for the specified dialog', () => {
        const appState = {
          dialog: {},
        };
        const metadata = getMetadata(appState, dialogId);
        expect(metadata).toBeUndefined();
      });
    });
  });
});
