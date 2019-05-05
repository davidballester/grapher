import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import graphListReducer from './graph-list';
import graphReducer, { saveGraphSaga, loadGraphSaga, deleteGraphSaga } from './graph';
import newGraphReducer from './new-graph';
import nodeSelectionReducer from './node-selection';
import confirmDeleteNodeReducer from './confirm-delete-node';
import linkSelectionReducer from './link-selection';
import confirmDeleteLinkReducer from './confirm-delete-link';
import { navigateSaga } from './navigation';
import confirmDeleteGraphReducer from './confirm-delete-graph';
import dialogReducer from './dialog';

const sagaMiddleware = createSagaMiddleware();
const reducer = combineReducers({
  graphList: graphListReducer,
  graph: graphReducer,
  newGraph: newGraphReducer,
  nodeSelection: nodeSelectionReducer,
  confirmDeleteNode: confirmDeleteNodeReducer,
  linkSelection: linkSelectionReducer,
  confirmDeleteLink: confirmDeleteLinkReducer,
  confirmDeleteGraph: confirmDeleteGraphReducer,
  dialog: dialogReducer,
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(reducer, composeEnhancers(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(saveGraphSaga);
sagaMiddleware.run(loadGraphSaga);
sagaMiddleware.run(navigateSaga);
sagaMiddleware.run(deleteGraphSaga);
