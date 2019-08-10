import { connect } from 'react-redux';

import EditNode from '../edit-node/edit-node.component';
import { getIsOpen, closeDialog, DIALOG_IDS } from '../../../../../../ducks/dialog.duck';
import { createNode, getGroupsAsArray } from '../../../../../../ducks/graph';

function mapStateToProps(state) {
  return {
    title: 'New node',
    isOpen: getIsOpen(state, DIALOG_IDS.NEW_NODE),
    groups: getGroupsAsArray(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    save: (oldId, node) => {
      dispatch(createNode(node));
      dispatch(closeDialog(DIALOG_IDS.NEW_NODE));
    },
    cancel: () => dispatch(closeDialog(DIALOG_IDS.NEW_NODE)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditNode);
