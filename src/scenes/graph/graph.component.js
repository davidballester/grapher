import React from 'react';
import PropTypes from 'prop-types';

import ConfirmDeletes from './scenes/confirm-deletes';
import SelectedItems from './scenes/selection';
import Actions from './scenes/actions';

function Graph({ graphId, loadedGraphId, loadGraph }) {
  if (!!graphId && graphId !== loadedGraphId) {
    loadGraph(graphId);
  }
  return (
    <React.Fragment>
      <Actions />
      <ConfirmDeletes />
      <SelectedItems />
    </React.Fragment>
  );
}

Graph.propTypes = {
  graphId: PropTypes.string,
  loadedGraphId: PropTypes.string,
  loadGraph: PropTypes.func,
};

export default Graph;
