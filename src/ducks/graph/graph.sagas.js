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
  loadGraphError,
  GRAPH_SET_CONTENTS,
  GRAPH_SET_TEXT,
  setTextError,
  setContents,
  setText,
} from './graph.actions';
import graphGrammar, { sampleGraph } from '../../services/graph-grammar';
import { getId } from '../../ducks/auth.duck';

export function* saveGraph() {
  const graph = yield select(graphSelector);
  const userId = yield select(getId);
  yield call([graphService, 'saveGraph'], userId, graph);
  yield call([graphNamesService, 'saveGraphName'], userId, graph.id, graph.name);
}

export function* saveGraphSaga() {
  yield takeLatest([GRAPH_CREATE, GRAPH_SET_NAME, GRAPH_SET_CONTENTS, GRAPH_SET_TEXT], saveGraph);
}

export function* doLoadGraph(action) {
  const graphId = action.payload;
  const userId = yield select(getId);
  const graph = yield call([graphService, 'readGraph'], userId, graphId);
  if (graph) {
    yield put(loadGraphSuccess(graph));
  } else {
    yield put(loadGraphError());
  }
}

export function* loadGraphSaga() {
  yield takeLatest([GRAPH_LOAD], doLoadGraph);
}

export function* doDeleteGraph({ payload: graphId }) {
  const userId = yield select(getId);
  yield call([graphService, 'removeGraph'], userId, graphId);
  yield call([graphNamesService, 'removeGraphName'], userId, graphId);
}

export function* deleteGraphSaga() {
  yield takeLatest([GRAPH_DELETE], doDeleteGraph);
}

export function* processText({ payload: text }) {
  yield delay(500);
  const matchResult = yield call([graphGrammar, 'match'], text);
  if (!matchResult.succeeded()) {
    yield put(setTextError(matchResult));
  } else {
    const contents = yield call([graphGrammar, 'eval'], matchResult);
    const { nodes, links, groups } = contents;
    yield put(setContents(nodes, links, groups));
  }
}

export function* setTextSaga() {
  yield takeLatest([GRAPH_SET_TEXT], processText);
}

export function* createSampleGraph({ payload: { includeSampleGraph } }) {
  if (includeSampleGraph) {
    yield put(setText(sampleGraph));
  }
}

export function* createSampleGraphSaga() {
  yield takeLatest([GRAPH_CREATE], createSampleGraph);
}
