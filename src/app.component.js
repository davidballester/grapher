import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Canvas from './components/canvas';
import Graph from './scenes/graph';
import { ROUTES } from './constants';
import Welcome from './scenes/welcome';
import Import from './scenes/graph-import';

export class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Grapher</title>
          <link rel="canonical" href="https://wizardly-minsky-4657d5.netlify.com" />
          <meta name="Description" content="Grapher is a graph editor. It's that simple!" />
        </Helmet>
        <Route path={[ROUTES.BASE, ROUTES.GRAPHS]} exact render={() => <Welcome />} />
        <Route path={ROUTES.IMPORT_GRAPH} exact render={() => [<Import key="Import" />, <Canvas key="Canvas" />]} />
        <Route path={ROUTES.GRAPH} exact render={() => <Graph key="Graph" />} />
      </React.Fragment>
    );
  }
}
