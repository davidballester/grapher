import { takeLatest, call } from 'redux-saga/effects';

import history from '../services/history';
import { GRAPH_LIST_OPEN } from './graph-list';
import { NEW_GRAPH_OPEN } from './new-graph';
import { GRAPH_LOAD } from './graph';

export function* navigate({ type, payload }) {
  switch (type) {
    case NEW_GRAPH_OPEN: {
      yield call([history, 'push'], '/graph/new');
      break;
    }
    case GRAPH_LIST_OPEN: {
      yield call([history, 'push'], '/');
      break;
    }
    case GRAPH_LOAD: {
      yield call([history, 'push'], `/graph/${payload}`);
      break;
    }
    default: {
      break;
    }
  }
}

export function* navigateSaga() {
  yield takeLatest([NEW_GRAPH_OPEN, GRAPH_LIST_OPEN, GRAPH_LOAD], navigate);
}
