import { connect } from 'react-redux';

import NewLink from './new-link.component';
import { getIsOpen, closeDialog, DIALOG_IDS } from '../../../../../../ducks/dialog.duck';
import { createLink, getNodesIds, getGroupsAsArray } from '../../../../../../ducks/graph';

function mapStateToProps(state) {
  return {
    isOpen: getIsOpen(state, DIALOG_IDS.NEW_LINK),
    nodesIds: getNodesIds(state),
    groups: getGroupsAsArray(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    saveNewLink: (node) => {
      dispatch(createLink(node));
      dispatch(closeDialog(DIALOG_IDS.NEW_LINK));
    },
    cancelNewLink: () => dispatch(closeDialog(DIALOG_IDS.NEW_LINK)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewLink);
