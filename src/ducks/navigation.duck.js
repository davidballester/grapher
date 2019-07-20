import { takeLatest, call, select } from 'redux-saga/effects';

import history from '../services/history.service';
import { GRAPH_CREATE, GRAPH_DELETE, getId } from './graph';
import { GRAPH_IMPORT_SUCCESS } from '../scenes/graph-import/graph-import.duck';
import { SUBGRAPH_CREATOR_OPEN, SUBGRAPH_CREATOR_CLOSE } from './subgraph-creator.duck';
import { ROUTES } from '../constants';

// Actions
export const GRAPH_IMPORT_OPEN = 'grapher/Navigation/GRAPH_IMPORT_OPEN';
export const NEW_GRAPH_OPEN = 'grapher/Navigation/NEW_GRAPH_OPEN';
export const GRAPH_OPEN = 'grapher/Navigation/GRAPH_OPEN';
export const GRAPH_LIST_OPEN = 'grapher/Navigation/GRAPH_LIST_OPEN';

export function openImportGraph() {
  return {
    type: GRAPH_IMPORT_OPEN,
  };
}

export function openNewGraph() {
  return {
    type: NEW_GRAPH_OPEN,
  };
}

export function openGraph(id) {
  return {
    type: GRAPH_OPEN,
    payload: id,
  };
}

export function openGraphList() {
  return {
    type: GRAPH_LIST_OPEN,
  };
}

// Sagas
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
      const graphId = yield select(getId);
      yield call([history, 'push'], ROUTES.SUBGRAPH_CREATOR.replace(':graphId', graphId));
      break;
    }
    case SUBGRAPH_CREATOR_CLOSE: {
      const graphId = yield select(getId);
      yield call([history, 'push'], ROUTES.GRAPH.replace(':graphId', graphId));
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
