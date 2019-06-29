import { createSelector } from 'reselect';
import { takeLatest, call, put, delay, select } from 'redux-saga/effects';

import graphGrammar from './services/graph-grammar';
import { importSubgraph as graphImportSubgraph } from '../../ducks/graph';

export const SUBGRAPH_CREATOR_OPEN = 'grapher/SubgraphCreator/OPEN';
export const SUBGRAPH_CREATOR_CLOSE = 'grapher/SubgraphCreator/CLOSE';
export const SUBGRAPH_PROCESS = 'grapher/SubgraphCreator/PROCESS';
export const SUBGRAPH_PROCESS_SUCCESS = 'grapher/SubgraphCreator/PROCESS_SUCCESS';
export const SUBGRAPH_PROCESS_FAILURE = 'grapher/SubgraphCreator/PROCESS_FAILURE';
export const SUBGRAPH_IMPORT = 'grapher/SubgraphCreator/IMPORT';

const initialState = {
  nodes: [],
  links: [],
  error: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SUBGRAPH_PROCESS_SUCCESS: {
      const { nodes, links } = action.payload;
      return {
        ...state,
        nodes,
        links,
        error: false,
      };
    }
    case SUBGRAPH_PROCESS_FAILURE: {
      return {
        ...state,
        error: true,
      };
    }
    case SUBGRAPH_CREATOR_CLOSE: {
      return {
        ...state,
        error: false,
        nodes: [],
        links: [],
      };
    }
    default: {
      return state;
    }
  }
}

export function openSubgraphCreator() {
  return {
    type: SUBGRAPH_CREATOR_OPEN,
  };
}

export function closeSubgraphCreator() {
  return {
    type: SUBGRAPH_CREATOR_CLOSE,
  };
}

export function processSubgraph(subgraphString) {
  return {
    type: SUBGRAPH_PROCESS,
    payload: subgraphString,
  };
}

export function processSubgraphSuccess(subgraph) {
  return {
    type: SUBGRAPH_PROCESS_SUCCESS,
    payload: subgraph,
  };
}

export function processSubgraphFailure() {
  return {
    type: SUBGRAPH_PROCESS_FAILURE,
  };
}

export function importSubgraph() {
  return {
    type: SUBGRAPH_IMPORT,
  };
}

function subgraphCreatorSelector(state) {
  return state.subgraphCreator;
}

export const getError = createSelector(
  subgraphCreatorSelector,
  (state) => state.error
);

export const getNodes = createSelector(
  subgraphCreatorSelector,
  (state) => state.nodes
);

export const getLinks = createSelector(
  subgraphCreatorSelector,
  (state) => state.links
);

export function* subgraphProcess({ payload: subgraphString }) {
  yield delay(500);
  const matchResult = yield call([graphGrammar, 'match'], subgraphString);
  if (!matchResult.succeeded()) {
    yield put(processSubgraphFailure());
  } else {
    const subgraph = yield call([graphGrammar, 'eval'], matchResult);
    yield put(processSubgraphSuccess(subgraph));
  }
}

export function* subgraphProcessSaga() {
  yield takeLatest([SUBGRAPH_PROCESS], subgraphProcess);
}

export function* doImportSubgraph() {
  const nodes = yield select(getNodes);
  const links = yield select(getLinks);
  yield put(graphImportSubgraph(nodes, links));
  yield put(closeSubgraphCreator());
}

export function* importSubgraphSaga() {
  yield takeLatest([SUBGRAPH_IMPORT], doImportSubgraph);
}
