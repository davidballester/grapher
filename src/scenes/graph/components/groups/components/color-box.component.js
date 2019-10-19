import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  root: {
    borderRadius: '2px',
    width: theme.spacing(2),
    height: theme.spacing(2),
  },
});

function ColorBox({ color = '#ccc', classes }) {
  console.log(color);
  return <div className={classes.root} style={{ backgroundColor: color }} />;
}

export default withStyles(styles, { withTheme: true })(ColorBox);
