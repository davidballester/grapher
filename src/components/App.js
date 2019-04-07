import React, { Component } from 'react';
import { Provider } from 'react-redux';

import { store } from '../modules/store';
import GraphList from '../containers/GraphList';
import NewGraph from '../containers/NewGraph';
import Canvas from '../containers/Canvas';
import NewNode from '../containers/NewNode';
import SelectedNodes from '../containers/SelectedNodes';
import ConfirmDeleteNode from '../containers/ConfirmDeleteNode';

export class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <GraphList />
        <NewGraph />
        <Canvas />
        <NewNode />
        <SelectedNodes />
        <ConfirmDeleteNode />
      </Provider>
    );
  }
}
