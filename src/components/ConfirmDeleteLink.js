import React from 'react';
import PropTypes from 'prop-types';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';

function ConfirmDeleteLink({ isOpen, linkId, deleteLink, cancel }) {
  return (
    <Dialog open={isOpen}>
      <DialogTitle>Delete {linkId}?</DialogTitle>
      <DialogContent>
        <DialogContentText>You are about to delete this link: {linkId}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={cancel} className="cancel">
          Cancel
        </Button>
        <Button onClick={() => deleteLink(linkId)} className="delete" color="primary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ConfirmDeleteLink.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  linkId: PropTypes.string,
  deleteLink: PropTypes.func,
  cancel: PropTypes.func,
};

export default ConfirmDeleteLink;
