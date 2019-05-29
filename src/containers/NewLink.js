import { connect } from 'react-redux';

import NewLink from '../components/NewLink/NewLink';
import { getIsOpen, closeDialog, DIALOG_IDS } from '../modules/dialog';
import { createLink, getNodesIds } from '../modules/graph';

function mapStateToProps(state) {
  return {
    isOpen: getIsOpen(state, DIALOG_IDS.NEW_LINK),
    nodesIds: getNodesIds(state),
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
