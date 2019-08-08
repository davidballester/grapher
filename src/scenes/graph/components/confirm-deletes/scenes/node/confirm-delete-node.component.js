import React from 'react';
import PropTypes from 'prop-types';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

function ConfirmDeleteNode({ isOpen, nodeIds = [], deleteNodes, cancel }) {
  const nodesLabel = nodeIds.length > 1 ? 'nodes' : 'node';
  const theseLabel = nodeIds.length > 1 ? 'these' : 'this';
  const nodes = nodeIds.map((nodeId) => (
    <ListItem key={nodeId}>
      <ListItemText primary={nodeId} />
    </ListItem>
  ));
  return (
    <Dialog open={isOpen}>
      <DialogTitle>Delete {nodesLabel}?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          You are about to delete {theseLabel} {nodesLabel}:
        </DialogContentText>
        <List>{nodes}</List>
      </DialogContent>
      <DialogActions>
        <Button onClick={cancel} className="cancel">
          Cancel
        </Button>
        <Button onClick={() => deleteNodes(nodeIds)} className="delete" color="primary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ConfirmDeleteNode.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  deleteNodes: PropTypes.func,
  cancel: PropTypes.func,
};

export default ConfirmDeleteNode;
