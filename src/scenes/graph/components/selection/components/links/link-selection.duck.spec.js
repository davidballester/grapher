import reducer, { LINK_SELECTION_SELECT, LINK_SELECTION_DESELECT, selectLink, deselectLink, getSelectedLink } from './link-selection.duck';
import { GRAPH_CREATE, GRAPH_LOAD_SUCCESS } from '../../../../../../ducks/graph';

describe('link-selection', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('actions', () => {
    describe(selectLink.name, () => {
      it('creates the action with the `LINK_SELECTION_SELECT` type', () => {
        const action = selectLink();
        expect(action.type).toEqual(LINK_SELECTION_SELECT);
      });

      it('contains the given argument as payload', () => {
        const payload = 'foo';
        const action = selectLink(payload);
        expect(action.payload).toEqual(payload);
      });
    });

    describe(deselectLink.name, () => {
      it('creates the action with the `LINK_SELECTION_DESELECT` type', () => {
        const action = deselectLink();
        expect(action.type).toEqual(LINK_SELECTION_DESELECT);
      });
    });
  });

  describe(reducer.name, () => {
    describe('LINK_SELECTION_SELECT', () => {
      it("sets the action's payload as the selected link", () => {
        const link = { foo: 'bar' };
        const initialState = {};
        const action = selectLink(link);
        const state = reducer(initialState, action);
        expect(state).toEqual({ selectedLink: link });
      });
    });

    describe('LINK_SELECTION_DESELECT', () => {
      it('unsets the selected link', () => {
        const initialState = {
          selectedLink: { foo: 'bar' },
        };
        const action = deselectLink();
        const state = reducer(initialState, action);
        expect(state).toEqual({ selectedLink: undefined });
      });
    });

    describe('GRAPH_CREATE', () => {
      it('clears the selected link', () => {
        const initialState = {
          selectedLink: {
            id: 'foo',
            baz: 'qux',
          },
        };
        const state = reducer(initialState, { type: GRAPH_CREATE });
        expect(state.selectedLink).toBeUndefined();
      });
    });

    describe('GRAPH_LOAD_SUCCESS', () => {
      it('clears the selected link', () => {
        const initialState = {
          selectedLink: {
            id: 'foo',
            baz: 'qux',
          },
        };
        const state = reducer(initialState, { type: GRAPH_LOAD_SUCCESS });
        expect(state.selectedLink).toBeUndefined();
      });
    });
  });

  describe('selectors', () => {
    describe(getSelectedLink.name, () => {
      it('extracts the `selectedLink` from linkSelection substate', () => {
        const link = { foo: 'bar' };
        const appState = {
          linkSelection: {
            selectedLink: link,
          },
        };
        const selectedLink = getSelectedLink(appState);
        expect(selectedLink).toEqual(link);
      });
    });
  });
});
