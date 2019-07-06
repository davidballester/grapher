import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    borderRadius: '2px',
    width: '1rem',
    height: '1rem',
  },
};

function ColorBox({ color, classes }) {
  return <div className={classes.root} style={{ backgroundColor: color }} />;
}

export default withStyles(styles)(ColorBox);
