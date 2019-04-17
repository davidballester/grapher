import { takeLatest, call } from 'redux-saga/effects';

import history from '../services/history';
import { NEW_GRAPH_OPEN, NEW_GRAPH_CLOSE } from './new-graph';
import { GRAPH_LOAD } from './graph';

export function* navigate({ type, payload }) {
  switch (type) {
    case NEW_GRAPH_OPEN: {
      yield call([history, 'push'], '/graph/new');
      break;
    }
    case NEW_GRAPH_CLOSE: {
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
  yield takeLatest([NEW_GRAPH_OPEN, NEW_GRAPH_CLOSE, GRAPH_LOAD], navigate);
}
