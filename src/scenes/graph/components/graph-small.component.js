import React, { useState } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/core/styles';

import Navbar from '../../../components/navbar';
import ActionsMenu from './actions-menu';
import Editor from './editor';
import Canvas from '../../../components/canvas';

const styles = () => ({
  canvas: {
    position: 'absolute',
    top: '128px',
    left: 0,
    height: 'calc(100vh - 128px)',
  },
  tabContent: {
    width: '100vw',
    height: 'calc(100vh - 128px)',
  },
});

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function GraphSmall({ graphName, openGraphList, classes }) {
  const [value, setValue] = useState(0);

  return (
    <>
      <Navbar
        title={graphName}
        onBack={openGraphList}
        additionalToolbars={
          <Tabs
            value={value}
            onChange={(event, newValue) => setValue(newValue)}
            aria-label="editor and graph view in separate tabs"
            variant="fullWidth"
          >
            <Tab label="Editor" {...a11yProps(0)} />
            <Tab label="Graph view" {...a11yProps(1)} />
          </Tabs>
        }
      >
        <ActionsMenu />
      </Navbar>
      <Box
        role="tabpanel"
        display={value === 0 ? 'block' : 'none'}
        id="simple-tabpanel-0"
        aria-labelledby="simple-tab-0"
        className={classes.tabContent}
      >
        <Editor height="100%" width="100%" />
      </Box>
      <Box
        role="tabpanel"
        display={value === 1 ? 'block' : 'none'}
        id="simple-tabpanel-1"
        aria-labelledby="simple-tab-1"
        className={classes.tabContent}
        width="100vw"
      >
        {value === 1 && <Canvas className={classes.canvas} defaultWidth={true} />}
      </Box>
    </>
  );
}

export default withStyles(styles)(GraphSmall);
