import React from 'react';
import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

import imageDark from './assets/onboarding-groups_dark.png';
import imageLight from './assets/onboarding-groups_light.png';

const styles = (theme) => ({
  img: {
    maxWidth: '100%',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
});

const Groups = ({ hidden, isDarkMode, className, classes }) => {
  const theme = useTheme();
  const bigScreen = useMediaQuery(theme.breakpoints.up('md'));
  return (
    <Box hidden={hidden} className={className}>
      <p>Categorize your nodes and links by assigning them groups.</p>
      <p>Nodes that have a groups assigned are colored based on their group.</p>
      <p>If you want to assign colors to your groups, declare them before using this notation:</p>
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
        There are a bunch of predefined colors you can use: purple, blue, green, yellow, orange, brown, grey... but, if none of them suits your needs,
        you can define your own colors using RGB hexadecimal notation.
      </p>
      <p>Assign groups to nodes and links:</p>
      <pre>
        (Aragorn :Dunedain)
        <br />
        (Bilbo :Hobbit)-[:family]->(Frodo: Hobbit)
        <br />
      </pre>
      {bigScreen && (
        <>
          <Box textAlign="center">
            <img src={isDarkMode ? imageDark : imageLight} alt="Sample groups" className={classes.img} />
          </Box>
          <p>Check your groups from the card at the bottom right corner</p>
        </>
      )}
    </Box>
  );
};

export default withStyles(styles, { withTheme: true })(Groups);
