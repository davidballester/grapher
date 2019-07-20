import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import SelectedNodes from './scenes/nodes';
import SelectedLink from './scenes/links';

const styles = (theme) => ({
  link: {
    marginBottom: theme.spacing(1),
  },
});

function SelectedItems({ classes = {}, className }) {
  return (
    <div className={className}>
      <SelectedLink className={classes.link} />
      <SelectedNodes />
    </div>
  );
}

export default withStyles(styles, { withTheme: true })(SelectedItems);
