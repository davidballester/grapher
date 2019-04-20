import React from 'react';
import PropTypes from 'prop-types';

import NewNode from '../containers/NewNode';
import ConfirmDeleteNode from '../containers/ConfirmDeleteNode';
import ConfirmDeleteLink from '../containers/ConfirmDeleteLink';
import SelectedItems from './SelectedItems';
import EditNode from '../containers/EditNode';

function Graph({ graphId, loadedGraphId, loadGraph }) {
  if (!!graphId && graphId !== loadedGraphId) {
    loadGraph(graphId);
  }
  return (
    <React.Fragment>
      <NewNode />
      <ConfirmDeleteNode />
      <ConfirmDeleteLink />
      <SelectedItems />
      <EditNode />
    </React.Fragment>
  );
}

Graph.propTypes = {
  graphId: PropTypes.string,
  loadedGraphId: PropTypes.string,
  loadGraph: PropTypes.func,
};

export default Graph;
