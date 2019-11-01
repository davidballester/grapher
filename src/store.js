import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import graphListReducer from './scenes/graph-list/graph-list.duck';
import graphReducer, { saveGraphSaga, loadGraphSaga, deleteGraphSaga, setTextSaga, createSampleGraphSaga } from './ducks/graph';
import nodeSelectionReducer from './scenes/graph/components/selection/components/nodes/node-selection.duck';
import linkSelectionReducer from './scenes/graph/components/selection/components/links/link-selection.duck';
import { navigateSaga } from './ducks/navigation.duck';
import dialogReducer from './ducks/dialog.duck';
import canvasReducer, { refreshSaga } from './components/canvas/canvas.duck';
import graphImportReducer, { importGraphSaga } from './scenes/graph-import/graph-import.duck';
import onboardingReducer, { persistDismiss } from './scenes/graph/components/onboarding/onboarding.duck';

const sagaMiddleware = createSagaMiddleware();
const reducer = combineReducers({
  graphList: graphListReducer,
  graph: graphReducer,
  nodeSelection: nodeSelectionReducer,
  linkSelection: linkSelectionReducer,
  dialog: dialogReducer,
  canvas: canvasReducer,
  graphImport: graphImportReducer,
  onboarding: onboardingReducer,
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(reducer, composeEnhancers(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(saveGraphSaga);
sagaMiddleware.run(loadGraphSaga);
sagaMiddleware.run(navigateSaga);
sagaMiddleware.run(deleteGraphSaga);
sagaMiddleware.run(refreshSaga);
sagaMiddleware.run(importGraphSaga);
sagaMiddleware.run(persistDismiss);
sagaMiddleware.run(setTextSaga);
sagaMiddleware.run(createSampleGraphSaga);
