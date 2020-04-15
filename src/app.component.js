import React from 'react';
import { Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Graph from './scenes/graph';
import { ROUTES } from './constants';
import Welcome from './scenes/welcome';
import PrivacyPolicy from './scenes/privacy-policy';
import CustomThemeProvider from './components/CustomThemeProvider';

export function App() {
  return (
    <CustomThemeProvider>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Grapher</title>
        <link rel="canonical" href="https://wizardly-minsky-4657d5.netlify.com" />
        <meta name="Description" content="Grapher is a graph editor. It's that simple!" />
      </Helmet>
      <Route path={[ROUTES.BASE, ROUTES.GRAPHS]} exact render={() => <Welcome />} />
      <Route path={ROUTES.GRAPH} exact render={() => <Graph key="Graph" />} />
      <Route path={ROUTES.PRIVACY_POLICY} exact render={() => <PrivacyPolicy />} />
    </CustomThemeProvider>
  );
}
