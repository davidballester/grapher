import { connect } from 'react-redux';

import SelectedLink from '../components/SelectedLink';
import { getSelectedLink } from '../modules/link-selection';
import { openDialog, DIALOG_IDS } from '../modules/dialog';

function mapStateToProps(state) {
  return {
    link: getSelectedLink(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    openEditLink: (link) => dispatch(openDialog(DIALOG_IDS.EDIT_LINK, link)),
    openConfirmDeleteLink: (linkId) => dispatch(openDialog(DIALOG_IDS.CONFIRM_DELETE_LINK, linkId)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectedLink);
