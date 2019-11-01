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
    <p>Categorize your nodes and links by assigning them groups.</p>
    <p>Nodes that have a groups assigned are colored based on their group.</p>
    <p>If you want to assign colors to your groups, declare them before using them with this notation:</p>
    <pre>
      :Dunedain #orange
      <br />
      :Hobbit #yellow
      <br />
      :Elf #ACE87B
      <br />
      :Dwarf #red
      <br />
    </pre>
    <p>
      There are a bunch of predefined colors you can use: purple, blue, green, yellow, orange, brown and grey, but, if none of them suits your needs,
      you can define your own colors using RGB hexadecimal notation.
    </p>
    <p>Assign groups to nodes and links to color them automatically.</p>
    <p>To assign groups to nodes and links, use this notation:</p>
    <pre>
      (Aragorn :Dunedain)
      <br />
      (Bilbo :Hobbit)-[:family]->(Frodo: Hobbit)
      <br />
    </pre>
    <Box textAlign="center">
      <img src={image} alt="Sample groups" className={classes.img} />
    </Box>
    <p>Check your groups from the card at the bottom right corner</p>
  </Box>
);

export default withStyles(styles, { withTheme: true })(Groups);
