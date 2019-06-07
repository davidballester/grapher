/* eslint-disable import/first */
import { takeLatest, call, put } from 'redux-saga/effects';
import { cloneableGenerator } from '@redux-saga/testing-utils';

jest.mock('../services/graph-service', () => ({
  deserializeGraph: jest.fn(),
}));

import graphService from '../services/graph-service';
import { loadGraphSuccess } from './graph';

import reducer, {
  GRAPH_IMPORT_OPEN,
  GRAPH_IMPORT,
  GRAPH_IMPORT_SUCCESS,
  GRAPH_IMPORT_FAILURE,
  openImportGraph,
  importGraph,
  importGraphSuccess,
  importGraphFailure,
  getErrors,
  importGraphSaga,
  doImportGraph,
} from './graph-import';

describe('graph-import', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('actions', () => {
    describe(openImportGraph.name, () => {
      it('creates the action with the `GRAPH_IMPORT_OPEN` type', () => {
        const action = openImportGraph();
        expect(action.type).toEqual(GRAPH_IMPORT_OPEN);
      });
    });

    describe(importGraph.name, () => {
      it('creates the action with the `GRAPH_IMPORT` type', () => {
        const action = importGraph();
        expect(action.type).toEqual(GRAPH_IMPORT);
      });

      it('uses the input as payload', () => {
        const action = importGraph('foo');
        expect(action.payload).toEqual('foo');
      });
    });

    describe(importGraphSuccess.name, () => {
      it('creates the action with the `GRAPH_IMPORT_SUCCESS` type', () => {
        const action = importGraphSuccess();
        expect(action.type).toEqual(GRAPH_IMPORT_SUCCESS);
      });

      it('uses the input as payload', () => {
        const action = importGraphSuccess({ foo: 'bar' });
        expect(action.payload).toEqual({ foo: 'bar' });
      });
    });

    describe(importGraphFailure.name, () => {
      it('creates the action with the `GRAPH_IMPORT_FAILURE` type', () => {
        const action = importGraphFailure();
        expect(action.type).toEqual(GRAPH_IMPORT_FAILURE);
      });

      it('uses the input as payload', () => {
        const action = importGraphFailure(['foo']);
        expect(action.payload).toEqual(['foo']);
      });
    });
  });

  describe(reducer.name, () => {
    describe('GRAPH_IMPORT_FAILURE', () => {
      it("sets the action's payload as errors", () => {
        const initialState = {};
        const action = importGraphFailure(['foo']);
        const state = reducer(initialState, action);
        expect(state).toEqual({ errors: ['foo'] });
      });
    });

    describe('GRAPH_IMPORT_SUCCESS', () => {
      it('empties the errors in the state', () => {
        const initialState = {
          errors: ['foo'],
        };
        const action = importGraphSuccess();
        const state = reducer(initialState, action);
        expect(state).toEqual({ errors: [] });
      });
    });

    describe('GRAPH_IMPORT', () => {
      it('empties the errors in the state', () => {
        const initialState = {
          errors: ['foo'],
        };
        const action = importGraph();
        const state = reducer(initialState, action);
        expect(state).toEqual({ errors: [] });
      });
    });
  });

  describe('selectors', () => {
    describe(getErrors.name, () => {
      it('gets the errors from the state', () => {
        const expectedErrors = ['foo'];
        const state = {
          graphImport: {
            errors: expectedErrors,
          },
        };
        const errors = getErrors(state);
        expect(errors).toEqual(expectedErrors);
      });
    });
  });

  describe('sagas', () => {
    describe(importGraphSaga.name, () => {
      it('invokes take latest with `GRAPH_IMPORT`', async () => {
        const action = importGraph();
        const gen = cloneableGenerator(importGraphSaga)(action);
        expect(gen.next().value).toEqual(takeLatest([GRAPH_IMPORT], doImportGraph));
      });
    });

    describe(doImportGraph.name, () => {
      const action = importGraph('{"foo": "bar"}');

      it("deserializes the action's payload", () => {
        const gen = cloneableGenerator(doImportGraph)(action);
        expect(gen.next().value).toEqual(call([graphService, 'deserializeGraph'], action.payload));
      });

      it('puts an import failure action if the deserialization offers errors', () => {
        const errors = ['foo'];
        const gen = cloneableGenerator(doImportGraph)(action);
        gen.next();
        expect(gen.next({ errors }).value).toEqual(put(importGraphFailure(errors)));
      });

      it('puts an import success action if the deserialization offers no errors', () => {
        const graph = { foo: 'bar' };
        const gen = cloneableGenerator(doImportGraph)(action);
        gen.next();
        expect(gen.next({ graph }).value).toEqual(put(importGraphSuccess(graph)));
      });

      it('puts a load graph success action if the deserialization offers no errors', () => {
        const graph = { foo: 'bar' };
        const gen = cloneableGenerator(doImportGraph)(action);
        gen.next();
        gen.next({ graph });
        expect(gen.next().value).toEqual(put(loadGraphSuccess(graph)));
      });
    });
  });
});
