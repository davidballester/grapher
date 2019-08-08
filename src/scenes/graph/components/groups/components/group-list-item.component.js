import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import ColorBox from './color-box.component';

export default function GroupListItemComponent({ group, onDelete, onEdit }) {
  return (
    <ListItem>
      <ListItemIcon>
        <ColorBox color={group.color} />
      </ListItemIcon>
      <ListItemText primary={group.name} />
      <ListItemSecondaryAction edge="end">
        <IconButton onClick={() => onEdit(group)}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => onDelete(group.id)}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}
