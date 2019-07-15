import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import SelectedNodes from './scenes/nodes';
import SelectedLink from './scenes/links';

const styles = (theme) => ({
  root: {
    position: 'absolute',
    left: theme.spacing(1),
    top: theme.spacing(1),
    width: '100%',
  },
  link: {
    marginBottom: theme.spacing(1),
  },
});

function SelectedItems({ classes = {} }) {
  return (
    <div className={classes.root}>
      <SelectedLink className={classes.link} />
      <SelectedNodes />
    </div>
  );
}

export default withStyles(styles, { withTheme: true })(SelectedItems);
