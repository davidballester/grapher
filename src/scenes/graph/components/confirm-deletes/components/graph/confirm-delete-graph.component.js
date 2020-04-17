import React from 'react';
import PropTypes from 'prop-types';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';

import CustomDialog from '../../../../../../components/CustomDialog';

function ConfirmDeleteGraph({ isOpen, graphName, graphId, deleteGraph, cancel }) {
  return (
    <CustomDialog open={isOpen}>
      <DialogTitle>Delete {graphName}?</DialogTitle>
      <DialogContent>
        <DialogContentText>You are about to delete this graph: {graphName}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={cancel} className="cancel">
          Cancel
        </Button>
        <Button onClick={() => deleteGraph(graphId)} className="delete" color="primary">
          Delete
        </Button>
      </DialogActions>
    </CustomDialog>
  );
}

ConfirmDeleteGraph.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  graphName: PropTypes.string,
  graphId: PropTypes.string,
  deleteGraph: PropTypes.func,
  cancel: PropTypes.func,
};

export default ConfirmDeleteGraph;
