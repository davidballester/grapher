import React from 'react';
import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/core';

import image from './assets/onboarding-add-nodes-and-links.png';

const styles = (theme) => ({
  img: {
    maxWidth: '100%',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
});

const AddNodesAndLinks = ({ hidden, className, classes }) => (
  <Box hidden={hidden} className={className}>
    <p>Add nodes and links from the speed dial on the bottom right corner</p>
    <Box textAlign="center">
      <img src={image} alt="Sample graph" className={classes.img} />
    </Box>
    <p>Name nodes and assign them a color, if you wish.</p>
    <p>Then, you can start linking them together by adding links. Which can also be named and colored!</p>
  </Box>
);

export default withStyles(styles, { withTheme: true })(AddNodesAndLinks);
