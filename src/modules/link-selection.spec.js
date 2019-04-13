import reducer, { LINK_SELECTION_SELECT, LINK_SELECTION_DESELECT, selectLink, deselectLink, getSelectedLink } from './link-selection';
import { GRAPH_DELETE_LINK, GRAPH_DELETE_NODE } from './graph';

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

    describe('GRAPH_DELETE_NODE', () => {
      it('unsets the selected link if the deleted node is its source', () => {
        const initialState = {
          selectedLink: {
            source: 'foo',
            target: 'bar',
          },
        };
        const action = { type: GRAPH_DELETE_NODE, payload: 'foo' };
        const state = reducer(initialState, action);
        expect(state).toEqual({ selectedLink: undefined });
      });

      it('unsets the selected link if the deleted node is its target', () => {
        const initialState = {
          selectedLink: {
            source: 'foo',
            target: 'bar',
          },
        };
        const action = { type: GRAPH_DELETE_NODE, payload: 'bar' };
        const state = reducer(initialState, action);
        expect(state).toEqual({ selectedLink: undefined });
      });

      it('does nothing if the deleted node is neither the selected link source nor its target', () => {
        const initialState = {
          selectedLink: {
            source: 'foo',
            target: 'bar',
          },
        };
        const action = { type: GRAPH_DELETE_NODE, payload: 'baz' };
        const state = reducer(initialState, action);
        expect(state).toEqual(initialState);
      });

      it('does nothing if there are no selected link', () => {
        const initialState = {
          selectedLink: undefined,
        };
        const action = { type: GRAPH_DELETE_NODE, payload: 'foo' };
        const state = reducer(initialState, action);
        expect(state).toEqual(initialState);
      });
    });

    describe('GRAPH_DELETE_LINK', () => {
      it('unsets the selected link if it is the deleted one', () => {
        const initialState = {
          selectedLink: {
            id: 'foo',
          },
        };
        const action = { type: GRAPH_DELETE_LINK, payload: 'foo' };
        const state = reducer(initialState, action);
        expect(state).toEqual({ selectedLink: undefined });
      });

      it('does nothing if deleted link is not the selected one', () => {
        const initialState = {
          selectedLink: {
            id: 'foo',
          },
        };
        const action = { type: GRAPH_DELETE_LINK, payload: 'bar' };
        const state = reducer(initialState, action);
        expect(state).toEqual(initialState);
      });

      it('does nothing if there is no selected link', () => {
        const initialState = {
          selectedLink: undefined,
        };
        const action = { type: GRAPH_DELETE_LINK, payload: 'foo' };
        const state = reducer(initialState, action);
        expect(state).toEqual(initialState);
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
