import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Canvas from './components/canvas';
import Graph from './scenes/graph';
import { ROUTES } from './constants';
import Welcome from './scenes/welcome';
import Import from './scenes/graph-import';

export class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Route path={[ROUTES.BASE, ROUTES.GRAPHS]} exact render={() => <Welcome />} />
        <Route path={ROUTES.IMPORT_GRAPH} exact render={() => [<Import key="Import" />, <Canvas key="Canvas" />]} />
        <Route path={ROUTES.GRAPH} exact render={() => <Graph key="Graph" />} />
      </React.Fragment>
    );
  }
}
