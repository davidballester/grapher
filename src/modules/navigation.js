import { takeLatest, call } from 'redux-saga/effects';

import history from '../services/history';
import { GRAPH_LIST_OPEN } from './graph-list';
import { NEW_GRAPH_OPEN } from './new-graph';
import { GRAPH_OPEN, GRAPH_CREATE } from './graph';

export function* navigate({ type, payload }) {
  switch (type) {
    case NEW_GRAPH_OPEN: {
      yield call([history, 'push'], '/new');
      break;
    }
    case GRAPH_LIST_OPEN: {
      yield call([history, 'push'], '/');
      break;
    }
    case GRAPH_OPEN: {
      yield call([history, 'push'], `/graphs/${payload}`);
      break;
    }
    case GRAPH_CREATE: {
      yield call([history, 'push'], `/graphs/${payload}`);
      break;
    }
    default: {
      break;
    }
  }
}

export function* navigateSaga() {
  yield takeLatest([NEW_GRAPH_OPEN, GRAPH_LIST_OPEN, GRAPH_OPEN, GRAPH_CREATE], navigate);
}
