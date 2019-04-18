import React, { useState } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

function isGraphNameValid(newGraphName) {
  return !!newGraphName.trim();
}

function submit(newGraphName, setError, saveNewGraph) {
  if (!isGraphNameValid(newGraphName)) {
    setError(true);
  } else {
    setError(false);
    saveNewGraph(newGraphName);
  }
}

export default function NewGraph({ title, saveNewGraph, cancelNewGraph }) {
  const [newGraphName, setNewGraphName] = useState('');
  const [error, setError] = useState(false);
  return (
    <Dialog open={true}>
      <DialogTitle>{title}</DialogTitle>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          submit(newGraphName, setError, saveNewGraph);
        }}
      >
        <DialogContent>
          <TextField error={error} label="Graph name" onChange={(event) => setNewGraphName(event.target.value)} value={newGraphName} />
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelNewGraph} className="cancel" type="button">
            Cancel
          </Button>
          <Button color="primary" type="submit">
            Done
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
