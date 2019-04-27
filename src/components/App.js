import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import GraphList from '../containers/GraphList';
import NewGraph from '../containers/NewGraph';
import Canvas from '../containers/Canvas';
import Graph from '../containers/Graph';
import MainBar from '../containers/MainBar';
import { ROUTES } from '../constants';

export class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Route component={MainBar} />
        <Route path={[ROUTES.BASE, ROUTES.GRAPHS]} exact component={GraphList} />
        <Route path={ROUTES.NEW_GRAPH} exact component={NewGraph} />
        <Route path={ROUTES.GRAPH} exact component={Graph} />
        <Canvas />
      </React.Fragment>
    );
  }
}
