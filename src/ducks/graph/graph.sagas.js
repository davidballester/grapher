import { select, takeLatest, call, put, delay } from 'redux-saga/effects';

import graphService from '../../services/graph.service';
import graphNamesService from '../../services/graph-names.service';
import { graphSelector } from './graph.selectors';
import {
  GRAPH_CREATE,
  GRAPH_SET_NAME,
  GRAPH_LOAD,
  GRAPH_DELETE,
  loadGraphSuccess,
  GRAPH_SET_CONTENTS,
  GRAPH_SET_TEXT,
  setTextError,
  setContents,
} from './graph.actions';
import graphGrammar from '../../services/graph-grammar';

export function* saveGraph() {
  const graph = yield select(graphSelector);
  yield call([graphService, 'saveGraph'], graph);
  yield call([graphNamesService, 'saveGraphName'], graph.id, graph.name);
}

export function* saveGraphSaga() {
  yield takeLatest([GRAPH_CREATE, GRAPH_SET_NAME, GRAPH_SET_CONTENTS, GRAPH_SET_TEXT], saveGraph);
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

export function* processText({ payload: text }) {
  yield delay(500);
  const matchResult = yield call([graphGrammar, 'match'], text);
  if (!matchResult.succeded()) {
    yield put(setTextError());
  } else {
    const contents = yield call([graphGrammar, 'eval'], text);
    const { nodes, links, groups } = contents;
    yield put(setContents(nodes, links, groups));
  }
}

export function* setTextSaga() {
  yield takeLatest([GRAPH_SET_TEXT], processText);
}
