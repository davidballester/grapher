import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import DeviceHubIcon from '@material-ui/icons/DeviceHub';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = (theme) => ({
  figure: {
    textAlign: 'center',
    margin: 'auto',
  },
  icon: {
    fontSize: '4rem',
  },
  callToAction: {
    marginTop: theme.spacing(1),
  },
});

function EmptyState({ classes, addGroup }) {
  return (
    <figure className={classes.figure}>
      <DeviceHubIcon className={classes.icon} />
      <figcaption>
        <Typography color="textPrimary">The are no groups</Typography>
      </figcaption>
      <Button onClick={addGroup} variant="contained" color="primary" className={classes.callToAction}>
        Add group
      </Button>
    </figure>
  );
}

export default withStyles(styles)(EmptyState);
