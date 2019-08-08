import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

export default function AddGroupListItem({ onClick }) {
  return (
    <ListItem button onClick={onClick}>
      <ListItemIcon>
        <AddCircleOutlineIcon />
      </ListItemIcon>
      <ListItemText primary="Add group" />
    </ListItem>
  );
}
