import { connect } from 'react-redux';

import ConfirmDeleteLink from '../components/ConfirmDeleteLink';
import { getIsOpen, closeDialog, getMetadata, DIALOG_IDS } from '../modules/dialog';
import { deleteLink } from '../modules/graph';

function mapStateToProps(state) {
  return {
    isOpen: getIsOpen(state, DIALOG_IDS.CONFIRM_DELETE_LINK),
    linkId: getMetadata(state, DIALOG_IDS.CONFIRM_DELETE_LINK),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    deleteLink: (linkId) => {
      dispatch(deleteLink(linkId));
      dispatch(closeDialog(DIALOG_IDS.CONFIRM_DELETE_LINK));
    },
    cancel: () => dispatch(closeDialog(DIALOG_IDS.CONFIRM_DELETE_LINK)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmDeleteLink);
