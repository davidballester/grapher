import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Box } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import Editor from './editor';
import Groups from './groups';
import SelectedItems from './selection';
import Canvas from '../../../components/canvas';

const styles = () => ({
  canvas: {
    position: 'absolute',
    top: '64px',
    left: 0,
    width: '100%',
    height: 'calc(100vh - 64px)',
  },
  grid: {
    position: 'absolute',
    top: '64px',
    left: 0,
    width: '100%',
    height: 'calc(100vh - 64px)',
    pointerEvents: 'none',
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
});

function GraphLarge({ classes }) {
  return (
    <>
      <Canvas className={classes.canvas} />
      <Grid container classes={{ root: classes.grid }}>
        <Grid item lg={4} sm={4} xs={12} className={classes.panel}>
          <Box className={classes.panelContent} padding={0} height="100%">
            <Editor height="100%" width="100%" />
          </Box>
        </Grid>
        <Grid item lg={5} sm={4} xs={12} />
        <Grid item lg={3} sm={4} xs={12}>
          <Box display="flex" alignItems="flex-end" className={classes.panel}>
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
