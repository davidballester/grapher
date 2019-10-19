/* eslint-disable import/first */
jest.mock('uuid/v4', () => ({
  __esModule: true,
  default: () => 'uuid',
}));

import { setGraphName, createGraph, loadGraphSuccess, setContents, setText, setTextError } from './graph.actions';
import reducer from './graph.reducer';

describe('reducer', () => {
  describe('GRAPH_SET_NAME', () => {
    it('sets the `name` in the state to the payload of the given action', () => {
      const initialState = {
        name: undefined,
      };
      const expectedName = 'foo';
      const action = setGraphName('id', expectedName);
      const state = reducer(initialState, action);
      expect(state.name).toEqual(expectedName);
    });
  });

  describe('GRAPH_CREATE', () => {
    it('sets the full graph in the state to the payload of the given action', () => {
      const graph = {
        nodes: {
          bar: {},
        },
        links: {
          baz: {},
        },
      };
      const initialState = {};
      const action = createGraph(graph);
      const state = reducer(initialState, action);
      expect(state).toMatchObject(graph);
    });

    it('sets the ID of the graph', () => {
      const initialState = {};
      const action = createGraph({});
      const state = reducer(initialState, action);
      expect(state.id).toEqual('uuid');
    });

    it('resets previous graph even if new one is empty', () => {
      const initialState = {
        id: 'foo',
        nodes: {
          foo: {},
        },
        links: {
          bar: {},
        },
        groups: {
          baz: {},
        },
      };
      const expectedState = {
        id: 'uuid',
        name: '',
        nodes: {},
        links: {},
        groups: {},
      };
      const action = createGraph({});
      const state = reducer(initialState, action);
      expect(state).toEqual(expectedState);
    });
  });

  describe('GRAPH_LOAD_SUCCESS', () => {
    it('sets the payload in the state', () => {
      const initialState = {
        foo: 'bar',
      };
      const graph = {
        name: 'foo',
        nodes: {},
        links: {},
      };
      const action = loadGraphSuccess(graph);
      const state = reducer(initialState, action);
      expect(state).toEqual({
        ...graph,
      });
    });
  });

  describe('GRAPH_SET_CONTENTS', () => {
    it('replaces the existing contents with map versions of nodes, links and groups', () => {
      const initialState = {
        nodes: {
          foo: {},
        },
        links: {
          bar: {},
        },
        groups: {
          baz: {},
        },
      };
      const expectedState = {
        nodes: {
          qux: { id: 'qux' },
        },
        links: {
          quux: { id: 'quux' },
        },
        groups: {
          corge: { id: 'corge' },
        },
      };
      const action = setContents([{ id: 'qux' }], [{ id: 'quux' }], [{ id: 'corge' }]);
      const state = reducer(initialState, action);
      expect(state).toEqual(expectedState);
    });
  });

  describe('GRAPH_SET_TEXT', () => {
    it('sets the `text` in the state to the payload of the given action', () => {
      const initialState = {
        text: undefined,
      };
      const action = setText('foo');
      const state = reducer(initialState, action);
      expect(state.text).toEqual('foo');
    });

    it('sets the textError in the state to undefined', () => {
      const initialState = {
        textError: true,
      };
      const action = setText('foo');
      const state = reducer(initialState, action);
      expect(state.textError).toEqual(undefined);
    });
  });

  describe('GRAPH_SET_TEXT_ERROR', () => {
    it('sets the textError in the state to the payload of the action', () => {
      const initialState = {
        textError: false,
      };
      const action = setTextError('foo');
      const state = reducer(initialState, action);
      expect(state.textError).toEqual('foo');
    });
  });
});
