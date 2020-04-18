import { select, takeLatest, call, put } from 'redux-saga/effects';
import { createSelector } from 'reselect';
import entries from 'lodash/entries';

import graphNamesService from '../../services/graph-names.service';
import { GRAPH_SET_NAME, GRAPH_CREATE, GRAPH_DELETE } from '../../ducks/graph';
import { getId, AUTH_SET, AUTH_UNSET } from '../../ducks/auth.duck';

export const WELCOME_READ_NAMES = 'grapher/Welcome/READ_NAMES';
export const WELCOME_READ_NAMES_SUCCESS = 'grapher/Welcome/READ_NAMES_SUCCESS';

export function readNames() {
  return {
    type: WELCOME_READ_NAMES,
  };
}

export function readNamesSuccess(names) {
  return {
    type: WELCOME_READ_NAMES_SUCCESS,
    payload: names,
  };
}

export default function reducer(state = null, action) {
  switch (action.type) {
    case GRAPH_CREATE: {
      const { id, name } = action.payload;
      return {
        ...state,
        [id]: name,
      };
    }
    case GRAPH_DELETE: {
      const { payload: graphId } = action;
      const newState = { ...state };
      delete newState[graphId];
      return newState;
    }
    case GRAPH_SET_NAME: {
      const { id, name } = action.payload;
      return {
        ...state,
        [id]: name,
      };
    }
    case WELCOME_READ_NAMES_SUCCESS: {
      const names = action.payload;
      return names || {};
    }
    default: {
      return state;
    }
  }
}

export function getGraphNames(state) {
  return state.welcome;
}

export const getGraphNamesAsArray = createSelector(
  getGraphNames,
  (graphNames) => (!!graphNames ? entries(graphNames) : undefined)
);

export function* doReadGraphNames() {
  const userId = yield select(getId);
  const names = yield call([graphNamesService, 'getGraphNames'], userId);
  yield put(readNamesSuccess(names));
}

export function* readGraphNamesSaga() {
  yield takeLatest([WELCOME_READ_NAMES], doReadGraphNames);
}

export function* doLogInSaga() {
  yield put(readNames());
}

export function* authChangeSaga() {
  yield takeLatest([AUTH_SET, AUTH_UNSET], doLogInSaga);
}
