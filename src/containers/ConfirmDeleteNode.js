import { connect } from 'react-redux';

import ConfirmDeleteNode from '../components/ConfirmDeleteNode';
import { getIsOpen, closeDialog, getMetadata, DIALOG_IDS } from '../modules/dialog';
import { deleteNode } from '../modules/graph';

function mapStateToProps(state) {
  return {
    isOpen: getIsOpen(state, DIALOG_IDS.CONFIRM_DELETE_NODE),
    nodeIds: getMetadata(state, DIALOG_IDS.CONFIRM_DELETE_NODE),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    deleteNodes: (nodeIds) => {
      nodeIds.forEach((nodeId) => dispatch(deleteNode(nodeId)));
      dispatch(closeDialog(DIALOG_IDS.CONFIRM_DELETE_NODE));
    },
    cancel: () => dispatch(closeDialog(DIALOG_IDS.CONFIRM_DELETE_NODE)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmDeleteNode);
