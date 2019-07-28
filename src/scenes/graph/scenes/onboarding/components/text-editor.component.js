import React from 'react';
import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/core';

import image from './assets/onboarding-text-editor.png';

const styles = (theme) => ({
  img: {
    maxWidth: '100%',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
});

const TextEditor = ({ hidden, className, classes }) => (
  <Box hidden={hidden} className={className}>
    <p>
      Become a power user by creating your graphs <em>writing them down</em>!
    </p>
    <p>Use the text editor at the bottom bar to do so.</p>
    <Box textAlign="center">
      <img src={image} alt="Sample graph" className={classes.img} />
    </Box>
    <p>The syntax is quite simple. Surround your nodes in parentheses and use arrows to link them.</p>
    <pre>(Frodo)->(Sam)</pre>
    <p>Name your links too, if you wish.</p>
    <pre>(Frodo)-[master of]->(Sam)</pre>
    <p>And assign groups using colons!</p>
    <pre>(Frodo:Hobbit:Ring bearer)-[master of:social relation]->(Sam)</pre>
  </Box>
);

export default withStyles(styles, { withTheme: true })(TextEditor);
