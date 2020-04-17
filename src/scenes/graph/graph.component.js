import React from 'react';
import PropTypes from 'prop-types';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

import ConfirmDeletes from './components/confirm-deletes';
import EditGraph from './components/edit-graph';
import Export from './components/export';
import Onboarding from './components/onboarding';
import GraphLarge from './components/graph-large.component';
import GraphSmall from './components/graph-small.component';
import NotFound from './components/not-found.component';
import CookieDialog from '../../components/CookieDialog';

export default function Graph({ graphId, graphName, loadedGraphId, loadGraph, openGraphList, loadError }) {
  const theme = useTheme();
  const bigScreen = useMediaQuery(theme.breakpoints.up('md'));

  if (loadError) {
    return <NotFound />;
  }

  if (!!graphId && graphId !== loadedGraphId) {
    loadGraph(graphId);
  }

  return (
    <>
      <CookieDialog />
      <ConfirmDeletes />
      <EditGraph />
      <Export />
      <Onboarding />
      {bigScreen && <GraphLarge graphName={graphName} openGraphList={openGraphList} />}
      {!bigScreen && <GraphSmall graphName={graphName} openGraphList={openGraphList} />}
    </>
  );
}

Graph.propTypes = {
  graphId: PropTypes.string,
  graphName: PropTypes.string,
  loadedGraphId: PropTypes.string,
  loadGraph: PropTypes.func,
  openGraphList: PropTypes.func,
};
