import { connect } from 'react-redux';

import ConfirmDeleteLink from './confirm-delete-link.component';
import { getIsOpen, closeDialog, getMetadata, DIALOG_IDS } from '../../../../../../ducks/dialog';
import { deleteLink, getLinkById } from '../../../../ducks';

function mapStateToProps(state) {
  const linkId = getMetadata(state, DIALOG_IDS.CONFIRM_DELETE_LINK);
  const { label: linkLabel } = getLinkById(state, linkId) || {};
  return {
    isOpen: getIsOpen(state, DIALOG_IDS.CONFIRM_DELETE_LINK),
    linkId,
    linkLabel,
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
