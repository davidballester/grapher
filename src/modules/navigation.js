import { takeLatest, call, select } from 'redux-saga/effects';

import history from '../services/history';
import { GRAPH_LIST_OPEN } from './graph-list';
import { NEW_GRAPH_OPEN } from './new-graph';
import { GRAPH_OPEN, GRAPH_CREATE, GRAPH_DELETE, getId } from './graph';
import { GRAPH_IMPORT_SUCCESS, GRAPH_IMPORT_OPEN } from './graph-import';
import { SUBGRAPH_CREATOR_OPEN, SUBGRAPH_CREATOR_CLOSE } from './subgraph-creator';
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
    case GRAPH_IMPORT_OPEN: {
      yield call([history, 'push'], ROUTES.IMPORT_GRAPH);
      break;
    }
    case GRAPH_IMPORT_SUCCESS: {
      yield call([history, 'push'], `${ROUTES.GRAPHS}/${payload.id}`);
      break;
    }
    case SUBGRAPH_CREATOR_OPEN: {
      yield call([history, 'push'], ROUTES.SUBGRAPH_CREATOR);
      break;
    }
    case SUBGRAPH_CREATOR_CLOSE: {
      const graphId = yield select(getId);
      yield call([history, 'push'], `${ROUTES.GRAPHS}/${graphId}`);
      break;
    }
    default: {
      break;
    }
  }
}

export function* navigateSaga() {
  yield takeLatest(
    [
      NEW_GRAPH_OPEN,
      GRAPH_LIST_OPEN,
      GRAPH_OPEN,
      GRAPH_CREATE,
      GRAPH_DELETE,
      GRAPH_IMPORT_OPEN,
      GRAPH_IMPORT_SUCCESS,
      SUBGRAPH_CREATOR_OPEN,
      SUBGRAPH_CREATOR_CLOSE,
    ],
    navigate
  );
}
