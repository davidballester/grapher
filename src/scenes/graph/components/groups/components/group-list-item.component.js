import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { withStyles } from '@material-ui/core/styles';

import ColorBox from './color-box.component';

const styles = (theme) => ({
  icon: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  text: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
});

const GroupListItemComponent = ({ group, classes }) => (
  <ListItem>
    <ListItemIcon classes={{ root: classes.icon }}>
      <ColorBox color={group.color} />
    </ListItemIcon>
    <ListItemText primary={group.name} classes={{ root: classes.text }} />
  </ListItem>
);

export default withStyles(styles, { withTheme: true })(GroupListItemComponent);
