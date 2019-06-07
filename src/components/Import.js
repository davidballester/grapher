import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import AceEditor from 'react-ace';

import 'brace/mode/javascript';
import 'brace/theme/monokai';

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

function Import({ errors = [], close, importGraph, classes }) {
  const [serializedGraph, setSerializedGraph] = useState('');
  const errorsListItems = errors.map((error, index) => (
    <ListItem key={index} classes={{ root: classes.listItem }}>
      <ListItemText classes={{ primary: classes.listItemText }} primary={error} />
    </ListItem>
  ));
  return (
    <Dialog open={true}>
      <DialogTitle>Import</DialogTitle>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          importGraph(serializedGraph);
        }}
      >
        <DialogContent>
          <List dense={true}>{errorsListItems}</List>
          <AceEditor
            placeholder=""
            mode="javascript"
            theme="monokai"
            fontSize={14}
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
    </Dialog>
  );
}

Import.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.string),
  importGraph: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Import);
