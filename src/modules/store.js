import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import graphListReducer from './graph-list';
import graphReducer, { saveGraphSaga, loadGraphSaga, deleteGraphSaga } from './graph';
import newGraphReducer from './new-graph';
import nodeSelectionReducer from './node-selection';
import linkSelectionReducer from './link-selection';
import { navigateSaga } from './navigation';
import dialogReducer from './dialog';
import canvasReducer, { refreshSaga } from './canvas';
import graphImportReducer, { importGraphSaga } from './graph-import';

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
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(reducer, composeEnhancers(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(saveGraphSaga);
sagaMiddleware.run(loadGraphSaga);
sagaMiddleware.run(navigateSaga);
sagaMiddleware.run(deleteGraphSaga);
sagaMiddleware.run(refreshSaga);
sagaMiddleware.run(importGraphSaga);
