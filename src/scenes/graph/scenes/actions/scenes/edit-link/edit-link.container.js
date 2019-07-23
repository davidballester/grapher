import { connect } from 'react-redux';

import EditLink from './edit-link.component';
import { getIsOpen, getMetadata, closeDialog, DIALOG_IDS } from '../../../../../../ducks/dialog.duck';
import { editLink, getGroupsAsArray } from '../../../../../../ducks/graph';

function mapStateToProps(state) {
  return {
    isOpen: getIsOpen(state, DIALOG_IDS.EDIT_LINK),
    link: getMetadata(state, DIALOG_IDS.EDIT_LINK),
    groups: getGroupsAsArray(state),
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
