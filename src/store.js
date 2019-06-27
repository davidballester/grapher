import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import graphListReducer from './scenes/graph-list/graph-list.duck';
import graphReducer, { saveGraphSaga, loadGraphSaga, deleteGraphSaga } from './scenes/graph/ducks';
import newGraphReducer from './scenes/new-graph/new-graph.duck';
import nodeSelectionReducer from './scenes/graph/scenes/selection/scenes/nodes/node-selection.duck';
import linkSelectionReducer from './scenes/graph/scenes/selection/scenes/links/link-selection.duck';
import { navigateSaga } from './ducks/navigation';
import dialogReducer from './ducks/dialog';
import canvasReducer, { refreshSaga } from './components/canvas/canvas.duck';
import graphImportReducer, { importGraphSaga } from './scenes/graph-import/graph-import.duck';
import subgraphCreatorReducer, { subgraphProcessSaga, importSubgraphSaga } from './scenes/subgraph-creator/subgraph-creator.duck';

const sagaMiddleware = createSagaMiddleware();
const reducer = combineReducers({
  graphList: graphListReducer,
  graph: graphReducer,
  newGraph: newGraphReducer,
  nodeSelection: nodeSelectionReducer,
  linkSelection: linkSelectionReducer,
  dialog: dialogReducer,
  canvas: canvasReducer,
  graphImport: graphImportReducer,
  subgraphCreator: subgraphCreatorReducer,
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(reducer, composeEnhancers(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(saveGraphSaga);
sagaMiddleware.run(loadGraphSaga);
sagaMiddleware.run(navigateSaga);
sagaMiddleware.run(deleteGraphSaga);
sagaMiddleware.run(refreshSaga);
sagaMiddleware.run(importGraphSaga);
sagaMiddleware.run(subgraphProcessSaga);
sagaMiddleware.run(importSubgraphSaga);
