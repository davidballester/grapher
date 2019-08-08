import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import SelectedNodes from './components/nodes';
import SelectedLink from './components/links';

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
