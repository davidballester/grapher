import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import NewGraph from './scenes/new-graph';
import Canvas from './components/canvas';
import Graph from './scenes/graph';
import { ROUTES } from './constants';
import GraphList from './scenes/graph-list';
import Import from './scenes/graph-import';
import SubgraphCreator from './scenes/subgraph-creator';

export class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Route path={[ROUTES.BASE, ROUTES.GRAPHS]} exact render={() => [<GraphList key="GraphList" />, <Canvas key="Canvas" />]} />
        <Route path={ROUTES.IMPORT_GRAPH} exact render={() => [<Import key="Import" />, <Canvas key="Canvas" />]} />
        <Route path={ROUTES.NEW_GRAPH} exact render={() => [<NewGraph key="NewGraph" />, <Canvas key="Canvas" />]} />
        <Route path={ROUTES.SUBGRAPH_CREATOR} exact component={SubgraphCreator} />
        <Route path={ROUTES.GRAPH} exact render={() => <Graph key="Graph" />} />
      </React.Fragment>
    );
  }
}
