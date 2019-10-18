import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import DeviceHubIcon from '@material-ui/icons/DeviceHub';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
  figure: {
    textAlign: 'center',
    margin: 'auto',
  },
  icon: {
    fontSize: '4rem',
  },
});

function EmptyState({ classes }) {
  return (
    <figure className={classes.figure}>
      <DeviceHubIcon className={classes.icon} />
      <figcaption>
        <Typography color="textPrimary">The are no groups</Typography>
      </figcaption>
    </figure>
  );
}

export default withStyles(styles)(EmptyState);
