import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import AceEditor from 'react-ace';
import { DropzoneArea } from 'material-ui-dropzone';

import 'brace/mode/javascript';
import 'brace/theme/monokai';

import './graph-import.component.css';
import CustomDialog from '../../../components/CustomDialog';

const styles = (theme) => {
  return {
    listItem: {
      paddingLeft: 0,
    },
    listItemText: {
      color: `${theme.palette.error.main}`,
    },
  };
};

function handleFileUpload(file, setSerializedGraph) {
  const fileReader = new FileReader();
  fileReader.onload = (event) => {
    const serializedGraph = event.target.result;
    setSerializedGraph(serializedGraph);
  };
  fileReader.readAsText(file);
}

function Import({ isOpen, errors = [], close, importGraph, classes }) {
  const [serializedGraph, setSerializedGraph] = useState('');
  const errorsListItems = errors.map((error, index) => (
    <ListItem key={index} classes={{ root: classes.listItem }}>
      <ListItemText classes={{ primary: classes.listItemText }} primary={error} />
    </ListItem>
  ));
  return (
    <CustomDialog open={isOpen}>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          importGraph(serializedGraph);
        }}
      >
        <DialogTitle>Import</DialogTitle>
        <DialogContent>
          <List dense={true}>{errorsListItems}</List>
          <DropzoneArea
            onChange={(files) => handleFileUpload(files[0], setSerializedGraph)}
            dropZoneClass="dropzone"
            dropzoneParagraphClass="dropzone__paragraph"
            dropzoneText="Drag and drop a JSON graph here or click to manually browse for it"
            acceptedFiles={['application/json']}
            filesLimit={1}
            showPreviewsInDropzone={false}
            showAlerts={false}
          />
          <AceEditor
            placeholder=""
            mode="javascript"
            theme="monokai"
            fontSize={12}
            showPrintMargin={false}
            showGutter={true}
            highlightActiveLine={true}
            value={serializedGraph}
            focus={true}
            onChange={(value) => setSerializedGraph(value)}
            setOptions={{
              showLineNumbers: true,
              tabSize: 2,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={close} type="button">
            Cancel
          </Button>
          <Button color="primary" type="submit">
            Done
          </Button>
        </DialogActions>
      </form>
    </CustomDialog>
  );
}

export default withStyles(styles)(Import);
