import { createSelector } from 'reselect';
import { takeLatest, call, put } from 'redux-saga/effects';

import graphService from '../../services/graph.service';
import { createGraph } from '../../ducks/graph';

export const GRAPH_IMPORT = 'grapher/GraphImport/IMPORT';
export const GRAPH_IMPORT_SUCCESS = 'grapher/GraphImport/IMPORT_SUCCESS';
export const GRAPH_IMPORT_FAILURE = 'grapher/GraphImport/IMPORT_FAILURE';
export const GRAPH_IMPORT_CLEAR = 'grapher/GraphImport/IMPORT_CLEAR';

const initialState = {
  errors: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GRAPH_IMPORT_FAILURE: {
      return {
        ...state,
        errors: action.payload,
      };
    }
    case GRAPH_IMPORT_SUCCESS: {
      return {
        ...state,
        errors: [],
      };
    }
    case GRAPH_IMPORT: {
      return {
        ...state,
        errors: [],
      };
    }
    case GRAPH_IMPORT_CLEAR: {
      return {
        ...state,
        errors: [],
      };
    }
    default: {
      return state;
    }
  }
}

export function importGraph(serializedGraph) {
  return {
    type: GRAPH_IMPORT,
    payload: serializedGraph,
  };
}

export function importGraphSuccess(graph) {
  return {
    type: GRAPH_IMPORT_SUCCESS,
    payload: graph,
  };
}

export function importGraphFailure(errors) {
  return {
    type: GRAPH_IMPORT_FAILURE,
    payload: errors,
  };
}

export function importGraphClear() {
  return {
    type: GRAPH_IMPORT_CLEAR,
  };
}

function graphImportSelector(state) {
  return state.graphImport;
}

export const getErrors = createSelector(
  graphImportSelector,
  (graphImportState) => graphImportState.errors
);

export function* doImportGraph(action) {
  const serializedGraph = action.payload;
  const { errors, graph } = yield call([graphService, 'deserializeGraph'], serializedGraph);
  if (!!errors) {
    yield put(importGraphFailure(errors));
  } else {
    yield put(importGraphSuccess(graph));
    yield put(createGraph(graph));
  }
}

export function* importGraphSaga() {
  yield takeLatest([GRAPH_IMPORT], doImportGraph);
}
