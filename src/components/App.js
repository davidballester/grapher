import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import NewGraph from '../containers/NewGraph';
import Canvas from '../containers/Canvas';
import Graph from '../containers/Graph';
import MainBar from '../containers/MainBar';
import { ROUTES } from '../constants';
import GraphList from '../containers/GraphList';
import Import from '../containers/Import';

export class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Route component={MainBar} />
        <Canvas />
        <Route path={[ROUTES.BASE, ROUTES.GRAPHS]} exact component={GraphList} />
        <Route path={ROUTES.IMPORT_GRAPH} exact component={Import} />
        <Route path={ROUTES.NEW_GRAPH} exact component={NewGraph} />
        <Route path={ROUTES.GRAPH} exact component={Graph} />
      </React.Fragment>
    );
  }
}
