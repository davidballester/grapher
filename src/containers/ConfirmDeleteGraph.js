import { connect } from 'react-redux';

import ConfirmDeleteGraph from '../components/ConfirmDeleteGraph';
import { getIsOpen, closeDialog, getMetadata, DIALOG_IDS } from '../modules/dialog';
import { deleteGraph, getId } from '../modules/graph';

function mapStateToProps(state) {
  return {
    isOpen: getIsOpen(state, DIALOG_IDS.CONFIRM_DELETE_GRAPH),
    graphName: getMetadata(state, DIALOG_IDS.CONFIRM_DELETE_GRAPH),
    graphId: getId(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    deleteGraph: (graphId) => {
      dispatch(deleteGraph(graphId));
      dispatch(closeDialog(DIALOG_IDS.CONFIRM_DELETE_GRAPH));
    },
    cancel: () => dispatch(closeDialog(DIALOG_IDS.CONFIRM_DELETE_GRAPH)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmDeleteGraph);
