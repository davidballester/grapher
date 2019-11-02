import React from 'react';
import PropTypes from 'prop-types';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

import ConfirmDeletes from './components/confirm-deletes';
import Navbar from '../../components/navbar';
import ActionsMenu from './components/actions-menu';
import EditGraph from './components/edit-graph';
import Export from './components/export';
import Onboarding from './components/onboarding';
import GraphLarge from './components/graph-large.component';

export default function Graph({ graphId, graphName, loadedGraphId, loadGraph, openGraphList, classes }) {
  if (!!graphId && graphId !== loadedGraphId) {
    loadGraph(graphId);
  }
  const theme = useTheme();
  const bigScreen = useMediaQuery(theme.breakpoints.up('sm'));
  return (
    <>
      <Navbar title={graphName} onBack={openGraphList}>
        <ActionsMenu />
      </Navbar>
      <ConfirmDeletes />
      <EditGraph />
      <Export />
      <Onboarding />
      {bigScreen && <GraphLarge />}
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
