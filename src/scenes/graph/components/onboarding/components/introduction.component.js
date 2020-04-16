import React from 'react';
import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/core';

import onboardingIntroductionLight from './assets/onboarding-introduction_light.png';
import onboardingIntroductionDark from './assets/onboarding-introduction_dark.png';

const styles = (theme) => ({
  img: {
    maxWidth: '100%',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
});

const Introduction = ({ hidden, isDarkMode, className, classes }) => (
  <Box hidden={hidden} className={className}>
    <p>Grapher is a tool to write down graphs. That's it!</p>
    <p>
      Start off by adding some nodes and link them to one another. Then, assign groups to them and color each group to reveal patterns in your graph.
    </p>
    <img src={isDarkMode ? onboardingIntroductionDark : onboardingIntroductionLight} alt="Sample graph" className={classes.img} />
    <p>Your graphs will be stored in your browser. You can export them to JSON format and then import them in some other browser!</p>
    <p>Or you can log in with your Google account and have them available everywhere!</p>
    <p>
      Want to learn more? Click the <em>next button</em>.
    </p>
  </Box>
);

export default withStyles(styles, { withTheme: true })(Introduction);
