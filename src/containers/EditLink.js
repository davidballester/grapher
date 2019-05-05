import { connect } from 'react-redux';

import EditLink from '../components/EditLink';
import { getIsOpen, getMetadata, closeDialog, DIALOG_IDS } from '../modules/dialog';
import { editLink } from '../modules/graph';

function mapStateToProps(state) {
  return {
    isOpen: getIsOpen(state, DIALOG_IDS.EDIT_LINK),
    link: getMetadata(state, DIALOG_IDS.EDIT_LINK),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    editLink: (link) => {
      dispatch(editLink(link));
      dispatch(closeDialog(DIALOG_IDS.EDIT_LINK));
    },
    cancelEditLink: () => dispatch(closeDialog(DIALOG_IDS.EDIT_LINK)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditLink);
