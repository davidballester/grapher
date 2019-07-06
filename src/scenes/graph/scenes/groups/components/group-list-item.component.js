import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import ColorBox from './color-box.component';

export default function GroupListItemComponent({ group }) {
  return (
    <ListItem>
      <ListItemIcon>
        <ColorBox color={group.color} />
      </ListItemIcon>
      <ListItemText primary={group.name} />
    </ListItem>
  );
}
