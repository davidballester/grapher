import { select, takeLatest, call, put } from 'redux-saga/effects';

import graphService from '../../services/graph.service';
import graphNamesService from '../../services/graph-names.service';
import { graphSelector } from './selectors';
import {
  GRAPH_CREATE,
  GRAPH_SET_NAME,
  GRAPH_CREATE_NODE,
  GRAPH_CREATE_LINK,
  GRAPH_DELETE_NODE,
  GRAPH_DELETE_LINK,
  GRAPH_EDIT_NODE,
  GRAPH_EDIT_LINK,
  GRAPH_LOAD,
  GRAPH_DELETE,
  loadGraphSuccess,
} from './actions';

export function* saveGraph() {
  const graph = yield select(graphSelector);
  yield call([graphService, 'saveGraph'], graph);
  yield call([graphNamesService, 'saveGraphName'], graph.id, graph.name);
}

export function* saveGraphSaga() {
  yield takeLatest(
    [GRAPH_CREATE, GRAPH_SET_NAME, GRAPH_CREATE_NODE, GRAPH_CREATE_LINK, GRAPH_DELETE_NODE, GRAPH_DELETE_LINK, GRAPH_EDIT_NODE, GRAPH_EDIT_LINK],
    saveGraph
  );
}

export function* doLoadGraph(action) {
  const graphId = action.payload;
  const graph = yield call([graphService, 'readGraph'], graphId);
  yield put(loadGraphSuccess(graph));
}

export function* loadGraphSaga() {
  yield takeLatest([GRAPH_LOAD], doLoadGraph);
}

export function* doDeleteGraph({ payload: graphId }) {
  yield call([graphService, 'removeGraph'], graphId);
  yield call([graphNamesService, 'removeGraphName'], graphId);
}

export function* deleteGraphSaga() {
  yield takeLatest([GRAPH_DELETE], doDeleteGraph);
}
