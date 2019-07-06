import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import ConfirmDeletes from './scenes/confirm-deletes';
import SelectedItems from './scenes/selection';
import Actions from './scenes/actions';
import Navbar from '../../components/navbar';
import ActionsMenu from './components/actions-menu.container';
import EditGraph from './scenes/edit-graph';
import Export from './scenes/export';
import Groups from './scenes/groups';

const styles = (theme) => ({
  groups: {
    position: 'absolute',
    bottom: theme.spacing(1),
    left: theme.spacing(1),
  },
});

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
      <Groups classes={{ root: classes.groups }} />
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

export default withStyles(styles, { withTheme: true })(Graph);
