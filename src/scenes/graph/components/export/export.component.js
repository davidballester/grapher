import React from 'react';
import PropTypes from 'prop-types';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import AceEditor from 'react-ace';

import 'brace/mode/javascript';
import 'brace/theme/monokai';

import DownloadButton from './components/download-button.component';
import CustomDialog from '../../../../components/CustomDialog';

function Export({ isOpen, graphName, serializedGraph, close }) {
  return (
    <CustomDialog open={isOpen}>
      <DialogTitle>Export</DialogTitle>
      <DialogContent>
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
          readOnly={true}
          setOptions={{
            enableBasicAutocompletion: false,
            enableLiveAutocompletion: false,
            enableSnippets: false,
            showLineNumbers: true,
            tabSize: 2,
          }}
        />
      </DialogContent>
      <DialogActions>
        <DownloadButton fileName={`${graphName}.json`} content={serializedGraph} />
        <Button color="primary" onClick={close}>
          Done
        </Button>
      </DialogActions>
    </CustomDialog>
  );
}

Export.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  graphName: PropTypes.string.isRequired,
  serializedGraph: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
};

export default Export;
