import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SelectedLink from '../components/SelectedLink';
import { getSelectedLink } from '../modules/link-selection';
import { openDialog, DIALOG_IDS } from '../modules/dialog';
import { openConfirmDeleteLink } from '../modules/confirm-delete-link';

function mapStateToProps(state) {
  return {
    link: getSelectedLink(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    openEditLink: () => dispatch(openDialog(DIALOG_IDS.EDIT_LINK)),
    ...bindActionCreators(
      {
        openConfirmDeleteLink,
      },
      dispatch
    ),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectedLink);
