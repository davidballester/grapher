import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router-dom';

import { store } from '../modules/store';
import history from '../services/history';
import GraphList from '../containers/GraphList';
import NewGraph from '../containers/NewGraph';
import Canvas from '../containers/Canvas';
import EditGraph from './EditGraph';

export class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Canvas />
          <Route path="/" exact component={GraphList} />
          <Route path="/graph/new" exact component={NewGraph} />
          <Route path="/graph/:graphName" exact component={EditGraph} />
        </Router>
      </Provider>
    );
  }
}
