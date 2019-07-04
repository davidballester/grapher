import React from 'react';
import PropTypes from 'prop-types';

import ConfirmDeletes from './scenes/confirm-deletes';
import SelectedItems from './scenes/selection';
import Actions from './scenes/actions';
import Navbar from '../../components/navbar';
import ActionsMenu from './components/actions-menu.container';
import EditGraph from './scenes/edit-graph';
import Export from './scenes/export';

function Graph({ graphId, graphName, loadedGraphId, loadGraph, openGraphList, classes }) {
  if (!!graphId && graphId !== loadedGraphId) {
    loadGraph(graphId);
  }
  return (
    <React.Fragment>
      <Navbar title={graphName} onBack={openGraphList}>
        <ActionsMenu />
      </Navbar>
      <Actions />
      <ConfirmDeletes />
      <SelectedItems />
      <EditGraph />
      <Export />
    </React.Fragment>
  );
}

Graph.propTypes = {
  graphId: PropTypes.string,
  graphName: PropTypes.string,
  loadedGraphId: PropTypes.string,
  loadGraph: PropTypes.func,
  openGraphList: PropTypes.func,
};

export default Graph;
