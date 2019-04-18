import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import GraphList from '../containers/GraphList';
import NewGraph from '../containers/NewGraph';
import Canvas from '../containers/Canvas';
import EditGraph from './EditGraph';

export class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Canvas />
        <Route path="/" exact component={GraphList} />
        <Route path="/graphs" exact component={GraphList} />
        <Route path="/graphs/new" exact component={NewGraph} />
        <Route path="/graphs/:graphName" exact component={EditGraph} />
      </React.Fragment>
    );
  }
}
