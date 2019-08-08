import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
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

const GroupListItemComponent = ({ group, onDelete, onEdit, classes }) => (
  <ListItem button onClick={() => onEdit(group)}>
    <ListItemIcon classes={{ root: classes.icon }}>
      <ColorBox color={group.color} />
    </ListItemIcon>
    <ListItemText primary={group.name} classes={{ root: classes.text }} />
    <ListItemSecondaryAction edge="end">
      <IconButton onClick={() => onDelete(group.id)}>
        <DeleteIcon />
      </IconButton>
    </ListItemSecondaryAction>
  </ListItem>
);

export default withStyles(styles, { withTheme: true })(GroupListItemComponent);
