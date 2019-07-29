import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import graphListReducer from './scenes/graph-list/graph-list.duck';
import graphReducer, { saveGraphSaga, loadGraphSaga, deleteGraphSaga } from './ducks/graph';
import nodeSelectionReducer from './scenes/graph/scenes/selection/scenes/nodes/node-selection.duck';
import linkSelectionReducer from './scenes/graph/scenes/selection/scenes/links/link-selection.duck';
import { navigateSaga } from './ducks/navigation.duck';
import dialogReducer from './ducks/dialog.duck';
import canvasReducer, { refreshSaga } from './components/canvas/canvas.duck';
import graphImportReducer, { importGraphSaga } from './scenes/graph-import/graph-import.duck';
import subgraphCreatorReducer, { subgraphProcessSaga, importSubgraphSaga } from './ducks/subgraph-creator.duck';
import onboardingReducer, { persistDismiss } from './scenes/graph/scenes/onboarding/onboarding.duck';

const sagaMiddleware = createSagaMiddleware();
const reducer = combineReducers({
  graphList: graphListReducer,
  graph: graphReducer,
  nodeSelection: nodeSelectionReducer,
  linkSelection: linkSelectionReducer,
  dialog: dialogReducer,
  canvas: canvasReducer,
  graphImport: graphImportReducer,
  subgraphCreator: subgraphCreatorReducer,
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
sagaMiddleware.run(subgraphProcessSaga);
sagaMiddleware.run(importSubgraphSaga);
sagaMiddleware.run(persistDismiss);
