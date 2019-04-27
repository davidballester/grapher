import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import graphNamesReducer from './graph-names';
import graphListReducer from './graph-list';
import graphReducer, { saveGraphSaga, loadGraphSaga } from './graph';
import newGraphReducer from './new-graph';
import newNodeReducer from './new-node';
import nodeSelectionReducer from './node-selection';
import confirmDeleteNodeReducer from './confirm-delete-node';
import linkSelectionReducer from './link-selection';
import confirmDeleteLinkReducer from './confirm-delete-link';
import editNodeReducer from './edit-node';
import editGraphReducer from './edit-graph';
import { navigateSaga } from './navigation';

const sagaMiddleware = createSagaMiddleware();
const reducer = combineReducers({
  graphNames: graphNamesReducer,
  graphList: graphListReducer,
  graph: graphReducer,
  newGraph: newGraphReducer,
  newNode: newNodeReducer,
  nodeSelection: nodeSelectionReducer,
  confirmDeleteNode: confirmDeleteNodeReducer,
  linkSelection: linkSelectionReducer,
  confirmDeleteLink: confirmDeleteLinkReducer,
  editNode: editNodeReducer,
  editGraph: editGraphReducer,
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(reducer, composeEnhancers(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(saveGraphSaga);
sagaMiddleware.run(loadGraphSaga);
sagaMiddleware.run(navigateSaga);
