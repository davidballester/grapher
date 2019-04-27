import React from 'react';
import PropTypes from 'prop-types';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';

function ConfirmDeleteGraph({ isOpen, graphName, deleteGraph, cancel }) {
  return (
    <Dialog open={isOpen}>
      <DialogTitle>Delete {graphName}?</DialogTitle>
      <DialogContent>
        <DialogContentText>You are about to delete this graph: {graphName}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={cancel} className="cancel">
          Cancel
        </Button>
        <Button onClick={() => deleteGraph()} className="delete" color="primary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ConfirmDeleteGraph.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  graphName: PropTypes.string,
  deleteGraph: PropTypes.func,
  cancel: PropTypes.func,
};

export default ConfirmDeleteGraph;
