import React, { Component } from 'react';
import { Provider } from 'react-redux';

import { store } from '../modules/store';
import GraphList from '../containers/GraphList';
import NewGraph from '../containers/NewGraph';

export class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <GraphList />
        <NewGraph />
      </Provider>
    );
  }
}
