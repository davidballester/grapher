import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import graphNamesReducer from './graph-names';
import graphListReducer from './graph-list';
import graphReducer from './graph';
import newGraphReducer from './new-graph';

const sagaMiddleware = createSagaMiddleware();
const reducer = combineReducers({
  graphNames: graphNamesReducer,
  graphList: graphListReducer,
  graph: graphReducer,
  newGraph: newGraphReducer,
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(reducer, composeEnhancers(applyMiddleware(sagaMiddleware)));
