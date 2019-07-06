import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';

export default function ConfirmDelete({ open = false, groupName, confirm, cancel }) {
  return (
    <Dialog open={open}>
      <DialogTitle>Do you want to delete {groupName}?</DialogTitle>
      <DialogContent>
        <DialogContentText>This action cannot be undone.</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={cancel} className="cancel">
          Cancel
        </Button>
        <Button onClick={confirm} color="primary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
