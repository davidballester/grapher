import { connect } from 'react-redux';

import EditNode from '../components/EditNode';
import { getIsOpen, getMetadata, closeDialog, DIALOG_IDS } from '../modules/dialog';
import { editNode, getNodesIds } from '../modules/graph';

function mapStateToProps(state) {
  return {
    isOpen: getIsOpen(state, DIALOG_IDS.EDIT_NODE),
    node: getMetadata(state, DIALOG_IDS.EDIT_NODE),
    nodesIds: getNodesIds(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    editNode: (oldId, node) => {
      dispatch(editNode(oldId, node));
      dispatch(closeDialog(DIALOG_IDS.EDIT_NODE));
    },
    cancelEditNode: () => dispatch(closeDialog(DIALOG_IDS.EDIT_NODE)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditNode);
