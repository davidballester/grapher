import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Avatar from '@material-ui/core/Avatar';
import AddIcon from '@material-ui/icons/Add';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

export default function GraphList({ graphNames, openNewGraph, openGraph }) {
  const listItems = graphNames.map((graphName) => (
    <ListItem key={graphName} button onClick={() => openGraph(graphName)}>
      <ListItemText primary={graphName} />
    </ListItem>
  ));

  const addGraph = (
    <ListItem button onClick={openNewGraph}>
      <ListItemAvatar>
        <Avatar>
          <AddIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary="Create new graph" />
    </ListItem>
  );

  return (
    <Dialog open={true}>
      <DialogTitle>Select a graph</DialogTitle>
      <DialogContent>
        <List>
          {listItems}
          {addGraph}
        </List>
      </DialogContent>
    </Dialog>
  );
}
