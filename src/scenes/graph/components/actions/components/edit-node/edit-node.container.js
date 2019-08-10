import { connect } from 'react-redux';

import EditNode from './edit-node.component';
import { getIsOpen, getMetadata, closeDialog, DIALOG_IDS } from '../../../../../../ducks/dialog.duck';
import { editNode, getNodesIds, getGroupsAsArray } from '../../../../../../ducks/graph';

function mapStateToProps(state) {
  const node = getMetadata(state, DIALOG_IDS.EDIT_NODE) || {};
  return {
    title: `Edit node ${node.id}`,
    isOpen: getIsOpen(state, DIALOG_IDS.EDIT_NODE),
    node,
    nodesIds: getNodesIds(state),
    groups: getGroupsAsArray(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    save: (oldId, node) => {
      dispatch(editNode(oldId, node));
      dispatch(closeDialog(DIALOG_IDS.EDIT_NODE));
    },
    cancel: () => dispatch(closeDialog(DIALOG_IDS.EDIT_NODE)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditNode);
