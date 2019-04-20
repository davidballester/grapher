import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import GraphList from '../containers/GraphList';
import NewGraph from '../containers/NewGraph';
import Canvas from '../containers/Canvas';
import EditGraph from '../containers/EditGraph';
import MainBar from '../containers/MainBar';

export class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Route component={MainBar} />
        <Route path="/" exact component={GraphList} />
        <Route path="/graphs" exact component={GraphList} />
        <Route path="/new" exact component={NewGraph} />
        <Route path="/graphs/:graphName" exact component={EditGraph} />
        <Canvas />
      </React.Fragment>
    );
  }
}
