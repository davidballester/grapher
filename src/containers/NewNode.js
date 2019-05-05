import { connect } from 'react-redux';

import NewNode from '../components/NewNode';
import { getIsOpen, closeDialog, DIALOG_IDS } from '../modules/dialog';
import { createNode } from '../modules/graph';

function mapStateToProps(state) {
  return {
    isOpen: getIsOpen(state, DIALOG_IDS.NEW_NODE),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    saveNewNode: (node) => {
      dispatch(createNode(node));
      dispatch(closeDialog(DIALOG_IDS.NEW_NODE));
    },
    cancelNewNode: () => dispatch(closeDialog(DIALOG_IDS.NEW_NODE)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewNode);
