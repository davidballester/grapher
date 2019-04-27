import { takeLatest, call } from 'redux-saga/effects';

import history from '../services/history';
import { GRAPH_LIST_OPEN } from './graph-list';
import { NEW_GRAPH_OPEN } from './new-graph';
import { GRAPH_OPEN, GRAPH_CREATE, GRAPH_DELETE } from './graph';
import { ROUTES } from '../constants';

export function* navigate({ type, payload }) {
  switch (type) {
    case NEW_GRAPH_OPEN: {
      yield call([history, 'push'], ROUTES.NEW_GRAPH);
      break;
    }
    case GRAPH_LIST_OPEN:
    case GRAPH_DELETE: {
      yield call([history, 'push'], ROUTES.BASE);
      break;
    }
    case GRAPH_OPEN: {
      yield call([history, 'push'], `${ROUTES.GRAPHS}/${payload}`);
      break;
    }
    case GRAPH_CREATE: {
      yield call([history, 'push'], `${ROUTES.GRAPHS}/${payload.id}`);
      break;
    }
    default: {
      break;
    }
  }
}

export function* navigateSaga() {
  yield takeLatest([NEW_GRAPH_OPEN, GRAPH_LIST_OPEN, GRAPH_OPEN, GRAPH_CREATE, GRAPH_DELETE], navigate);
}
