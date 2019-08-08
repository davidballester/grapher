import React from 'react';
import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/core';

import image from './assets/onboarding-groups.png';

const styles = (theme) => ({
  img: {
    maxWidth: '100%',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
});

const Groups = ({ hidden, className, classes }) => (
  <Box hidden={hidden} className={className}>
    <p>Assign groups to nodes and links to color them automatically.</p>
    <p>Reveal hidden patterns in your graph by grouping together nodes and links.</p>
    <Box textAlign="center">
      <img src={image} alt="Sample graph" className={classes.img} />
    </Box>
    <p>Manage groups from the card at the bottom left corner</p>
  </Box>
);

export default withStyles(styles, { withTheme: true })(Groups);
