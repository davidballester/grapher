import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Box } from '@material-ui/core';

import ConfirmDeletes from './scenes/confirm-deletes';
import SelectedItems from './scenes/selection';
import Actions from './scenes/actions';
import Navbar from '../../components/navbar';
import ActionsMenu from './components/actions-menu.container';
import EditGraph from './scenes/edit-graph';
import Export from './scenes/export';
import Groups from './scenes/groups';
import TextEditor from './scenes/text-editor';
import Canvas from '../../components/canvas';

const styles = (theme) => ({
  canvas: {
    position: 'absolute',
    top: '64px',
    left: 0,
    width: '100%',
    height: 'calc(100vh - 128px)',
  },
  grid: {
    position: 'absolute',
    top: '64px',
    left: 0,
    width: '100%',
    height: 'calc(100vh - 128px)',
    pointerEvents: 'none',
  },
  leftPanel: {
    height: 'calc(100vh - 128px)',
    padding: theme.spacing(2),
  },
  leftPanelContent: {
    overflow: 'scroll',
    pointerEvents: 'auto',
    width: '100%',
    maxHeight: '100%',
  },
  rightPanel: {
    padding: theme.spacing(2),
    height: '100%',
    '& > *': {
      pointerEvents: 'auto',
    },
  },
  selectedItems: {
    width: '100%',
  },
  textEditor: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
  },
});

function Graph({ graphId, graphName, loadedGraphId, loadGraph, openGraphList, classes }) {
  if (!!graphId && graphId !== loadedGraphId) {
    loadGraph(graphId);
  }
  return (
    <>
      <Navbar title={graphName} onBack={openGraphList}>
        <ActionsMenu />
      </Navbar>
      <Canvas className={classes.canvas} />
      <ConfirmDeletes />
      <EditGraph />
      <Export />
      <Grid container classes={{ root: classes.grid }}>
        <Grid item lg={3} xs={4}>
          <Box display="flex" alignItems="flex-end" className={classes.leftPanel}>
            <Box className={classes.leftPanelContent}>
              <SelectedItems className={classes.selectedItems} />
              <Groups />
            </Box>
          </Box>
        </Grid>
        <Grid item lg={8} xs={6} />
        <Grid item lg={1} xs={2}>
          <Box display="flex" alignItems="flex-end" justifyContent="flex-end" className={classes.rightPanel}>
            <Actions />
          </Box>
        </Grid>
      </Grid>
      <TextEditor className={classes.textEditor} />
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

export default withStyles(styles, { withTheme: true })(Graph);
