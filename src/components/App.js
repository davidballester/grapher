import React, { Component } from 'react';
import { Provider } from 'react-redux';

import { store } from '../modules/store';
import GraphList from '../containers/GraphList';
import NewGraph from '../containers/NewGraph';
import Canvas from '../containers/Canvas';
import NewNode from '../containers/NewNode';
import ConfirmDeleteNode from '../containers/ConfirmDeleteNode';
import ConfirmDeleteLink from '../containers/ConfirmDeleteLink';
import SelectedItems from './SelectedItems';
import EditNode from '../containers/EditNode';

export class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <GraphList />
        <NewGraph />
        <Canvas />
        <NewNode />
        <ConfirmDeleteNode />
        <ConfirmDeleteLink />
        <SelectedItems />
        <EditNode />
      </Provider>
    );
  }
}
