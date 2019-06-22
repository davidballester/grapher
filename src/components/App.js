import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import NewGraph from '../containers/NewGraph';
import Canvas from '../containers/Canvas';
import Graph from '../containers/Graph';
import MainBar from '../containers/MainBar';
import { ROUTES } from '../constants';
import GraphList from '../containers/GraphList';
import Import from '../containers/Import';
import SubgraphCreator from '../containers/SubgraphCreator';

export class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Route component={MainBar} />
        <Route path={[ROUTES.BASE, ROUTES.GRAPHS]} exact render={() => [<GraphList key="GraphList" />, <Canvas key="Canvas" />]} />
        <Route path={ROUTES.IMPORT_GRAPH} exact render={() => [<Import key="Import" />, <Canvas key="Canvas" />]} />
        <Route path={ROUTES.NEW_GRAPH} exact render={() => [<NewGraph key="NewGraph" />, <Canvas key="Canvas" />]} />
        <Route path={ROUTES.SUBGRAPH_CREATOR} exact component={SubgraphCreator} />
        <Route path={ROUTES.GRAPH} exact render={() => [<Graph key="Graph" />, <Canvas key="Canvas" />]} />
      </React.Fragment>
    );
  }
}
