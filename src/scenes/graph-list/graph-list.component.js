import React from 'react';
import PropTypes from 'prop-types';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Avatar from '@material-ui/core/Avatar';
import AddIcon from '@material-ui/icons/Add';
import InputIcon from '@material-ui/icons/Input';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

import Navbar from '../../components/navbar';

function GraphList({ graphNames, openNewGraph, openGraph, openImportGraph }) {
  const listItems = graphNames.map(([graphId, graphName]) => (
    <ListItem key={graphId} button onClick={() => openGraph(graphId)}>
      <ListItemText primary={graphName} />
    </ListItem>
  ));

  const addGraph = (
    <ListItem button onClick={openNewGraph} className="open-new-graph">
      <ListItemAvatar>
        <Avatar>
          <AddIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary="Create new graph" />
    </ListItem>
  );

  const importGraph = (
    <ListItem button onClick={openImportGraph} className="open-import-graph">
      <ListItemAvatar>
        <Avatar>
          <InputIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary="Import graph" />
    </ListItem>
  );

  return (
    <>
      <Navbar title="Graph list" />
      <Dialog open={true}>
        <DialogTitle>Select a graph</DialogTitle>
        <DialogContent>
          <List>
            {listItems}
            {addGraph}
            {importGraph}
          </List>
        </DialogContent>
      </Dialog>
    </>
  );
}

GraphList.propTypes = {
  graphNames: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
  openNewGraph: PropTypes.func,
  openGraph: PropTypes.func,
  openImportGraph: PropTypes.func,
};

export default GraphList;
