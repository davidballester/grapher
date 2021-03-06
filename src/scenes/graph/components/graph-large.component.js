import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Box } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import Navbar from '../../../components/navbar';
import ActionsMenu from './actions-menu';
import Editor from './editor';
import Groups from './groups';
import SelectedItems from './selection';
import Canvas from '../../../components/canvas';

const styles = () => ({
  canvas: {
    width: '100%',
    height: 'calc(100vh - 64px)',
  },
  grid: {
    position: 'absolute',
    top: '64px',
    left: 0,
    width: '100%',
    height: 'calc(100vh - 64px)',
  },
  panel: {
    height: 'calc(100vh - 64px)',
  },
  panelContent: {
    overflow: 'auto',
    pointerEvents: 'auto',
    width: '100%',
    maxHeight: '100%',
  },
  selectedItems: {
    width: '100%',
  },
  rightPanel: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
});

function GraphLarge({ classes, openGraphList, graphName }) {
  return (
    <>
      <Navbar title={graphName} onBack={openGraphList}>
        <ActionsMenu />
      </Navbar>
      <Grid container classes={{ root: classes.grid }}>
        <Grid item md={4} className={classes.panel}>
          <Box className={classes.panelContent} padding={0} height="100%">
            <Editor height="100%" width="100%" />
          </Box>
        </Grid>
        <Grid item md={8}>
          <Canvas className={classes.canvas} />
          <Box display="flex" alignItems="flex-end" className={classes.rightPanel}>
            <Box className={classes.panelContent} padding={3}>
              <SelectedItems className={classes.selectedItems} />
              <Groups />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default withStyles(styles)(GraphLarge);
