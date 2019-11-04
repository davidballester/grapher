import React, { useState } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

function isGraphNameValid(newGraphName) {
  return !!newGraphName.trim();
}

function submit(newGraphName, includeSampleGraph, setError, saveNewGraph) {
  if (!isGraphNameValid(newGraphName)) {
    setError(true);
  } else {
    setError(false);
    saveNewGraph(newGraphName, includeSampleGraph);
  }
}

export default function NewGraph({ isOpen, saveNewGraph, cancelNewGraph }) {
  const [formData, setFormData] = useState({ graphName: '', includeSampleGraph: true });
  const [error, setError] = useState(false);
  return (
    <Dialog open={isOpen}>
      <DialogTitle>Create new graph</DialogTitle>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          submit(formData.graphName, formData.includeSampleGraph, setError, saveNewGraph);
        }}
      >
        <DialogContent>
          <div>
            <TextField
              error={error}
              label="Graph name"
              onChange={(event) => setFormData({ ...formData, graphName: event.target.value })}
              value={formData.graphName}
            />
          </div>
          <div>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.includeSampleGraph}
                  onChange={() => setFormData({ ...formData, includeSampleGraph: !formData.includeSampleGraph })}
                  value="checkedA"
                />
              }
              label="Include sample data"
            />
          </div>
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
