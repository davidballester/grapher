/* eslint-disable import/first */

jest.mock('../services/links-service', () => ({
  __esModule: true,
  default: {
    getId: jest.fn(),
  },
}));

import reducer, { LINK_SELECTION_SELECT, LINK_SELECTION_DESELECT, selectLink, deselectLink, getSelectedLink } from './link-selection';
import { GRAPH_DELETE_LINK, GRAPH_DELETE_NODE, GRAPH_EDIT_NODE, GRAPH_EDIT_LINK } from './graph';
import linksService from '../services/links-service';

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

    describe('GRAPH_EDIT_NODE', () => {
      let oldId;
      let node;

      beforeEach(() => {
        oldId = 'foo';
        node = {
          id: 'qux',
        };
      });

      it('does not modify the selected link if there was none', () => {
        const initialState = {
          selectedLink: undefined,
        };
        const action = { type: GRAPH_EDIT_NODE, payload: { oldId, node } };
        const state = reducer(initialState, action);
        expect(state).toEqual(initialState);
      });

      it('does not modify the selected link if it is neither the source nor the the target', () => {
        const initialState = {
          selectedLink: {
            id: 'bar-baz',
            source: 'bar',
            target: 'baz',
          },
        };
        const action = { type: GRAPH_EDIT_NODE, payload: { oldId, node } };
        linksService.getId.mockReturnValue('bar-baz');
        const state = reducer(initialState, action);
        expect(state).toEqual(initialState);
      });

      it('modifies the link if the edited node is the source', () => {
        const initialState = {
          selectedLink: {
            id: 'foo-baz',
            source: 'foo',
            target: 'baz',
          },
        };
        const expectedState = {
          selectedLink: {
            id: 'qux-baz',
            source: 'qux',
            target: 'baz',
          },
        };
        const action = { type: GRAPH_EDIT_NODE, payload: { oldId, node } };
        linksService.getId.mockReturnValue('qux-baz');
        const state = reducer(initialState, action);
        expect(state).toEqual(expectedState);
      });

      it('modifies the link if the edited node is the target', () => {
        const initialState = {
          selectedLink: {
            id: 'baz-foo',
            source: 'baz',
            target: 'foo',
          },
        };
        const expectedState = {
          selectedLink: {
            id: 'baz-qux',
            source: 'baz',
            target: 'qux',
          },
        };
        const action = { type: GRAPH_EDIT_NODE, payload: { oldId, node } };
        linksService.getId.mockReturnValue('baz-qux');
        const state = reducer(initialState, action);
        expect(state).toEqual(expectedState);
      });

      it('does nothing if the edited node does not change its ID', () => {
        oldId = node.id;
        const initialState = {
          selectedLink: {
            id: 'foo-foo',
            source: 'foo',
            target: 'foo',
          },
        };
        const action = { type: GRAPH_EDIT_NODE, payload: { oldId, node } };
        linksService.getId.mockReturnValue('foo-foo');
        const state = reducer(initialState, action);
        expect(state).toEqual(initialState);
      });
    });

    describe('GRAPH_EDIT_LINK', () => {
      let action;

      beforeEach(() => {
        action = {
          type: GRAPH_EDIT_LINK,
          payload: {
            id: 'foo',
            bar: 'baz',
          },
        };
      });

      it('does nothing if there is no selected link', () => {
        const initialState = {
          selectedLink: undefined,
        };
        const state = reducer(initialState, action);
        expect(state).toEqual(initialState);
      });

      it('does nothing if the selected link is not the one edited', () => {
        const initialState = {
          selectedLink: {
            id: 'bar',
            baz: 'qux',
          },
        };
        const state = reducer(initialState, action);
        expect(state).toEqual(initialState);
      });

      it("replaces the selected link by the action's payload if their IDs match", () => {
        const initialState = {
          selectedLink: {
            id: 'foo',
            baz: 'qux',
          },
        };
        const expectedState = {
          selectedLink: action.payload,
        };
        const state = reducer(initialState, action);
        expect(state).toEqual(expectedState);
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
