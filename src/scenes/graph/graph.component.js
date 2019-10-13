import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Box } from '@material-ui/core';

import ConfirmDeletes from './components/confirm-deletes';
import SelectedItems from './components/selection';
import Actions from './components/actions';
import Navbar from '../../components/navbar';
import ActionsMenu from './components/actions-menu';
import EditGraph from './components/edit-graph';
import Export from './components/export';
import Groups from './components/groups';
import TextEditor from './components/text-editor';
import Canvas from '../../components/canvas';
import Onboarding from './components/onboarding';

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
    overflow: 'auto',
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
      <ConfirmDeletes />
      <EditGraph />
      <Export />
      <Onboarding />
      <Canvas className={classes.canvas} />
      <Grid container classes={{ root: classes.grid }}>
        <Grid item lg={3} sm={4} xs={6}>
          <Box display="flex" alignItems="flex-end" className={classes.leftPanel}>
            <Box className={classes.leftPanelContent} padding={1}>
              <SelectedItems className={classes.selectedItems} />
              <Groups />
            </Box>
          </Box>
        </Grid>
        <Grid item lg={8} sm={6} xs={4} />
        <Grid item lg={1} sm={2} xs={2}>
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
