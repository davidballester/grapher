import React from 'react';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  title: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(4),
  },
  text: {
    marginBottom: theme.spacing(2),
  },
});

function NotFound({ classes }) {
  return (
    <Container>
      <Typography component="h1" variant="h1" className={classes.title}>
        Graph not found!
      </Typography>
      <Typography component="p" variant="body1" className={classes.text}>
        That's unfortunate. If you are looking for a graph that was there before, remember that they are stored in your browser. Are you using a
        different browser?
      </Typography>
      <Typography component="p" variant="body1" className={classes.text}>
        To avoid accidental losses, remember that you can export your graphs from the top right corner and save them as JSON files into your computer
        that you can then import into Grapher whenever you want.
      </Typography>
      <Link href="/">Go to your graphs</Link>
    </Container>
  );
}

export default withStyles(styles, { withTheme: true })(NotFound);
