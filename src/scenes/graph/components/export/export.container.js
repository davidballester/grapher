import { connect } from 'react-redux';

import Export from './export.component';
import { getIsOpen, closeDialog, DIALOG_IDS } from '../../../../ducks/dialog.duck';
import { getSerializedGraph, getName } from '../../../../ducks/graph';

function mapStateToProps(state) {
  return {
    isOpen: getIsOpen(state, DIALOG_IDS.EXPORT_GRAPH),
    serializedGraph: getSerializedGraph(state),
    graphName: getName(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    close: () => dispatch(closeDialog(DIALOG_IDS.EXPORT_GRAPH)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Export);
