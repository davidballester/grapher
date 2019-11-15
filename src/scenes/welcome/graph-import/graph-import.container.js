import { connect } from 'react-redux';

import Import from './graph-import.component';
import { importGraph, getErrors, importGraphClear } from './graph-import.duck';
import { getIsOpen, closeDialog, DIALOG_IDS } from '../../../ducks/dialog.duck';

function mapStateToProps(state) {
  return {
    errors: getErrors(state),
    isOpen: getIsOpen(state, DIALOG_IDS.IMPORT_GRAPH),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    importGraph: (serializedGraph) => dispatch(importGraph(serializedGraph)),
    close: () => {
      dispatch(closeDialog(DIALOG_IDS.IMPORT_GRAPH));
      dispatch(importGraphClear());
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Import);
