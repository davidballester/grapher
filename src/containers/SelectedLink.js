import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SelectedLink from '../components/SelectedLink';
import { getSelectedLink } from '../modules/link-selection';
import { openConfirmDeleteLink } from '../modules/confirm-delete-link';

function mapStateToProps(state) {
  return {
    link: getSelectedLink(state),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ openConfirmDeleteLink }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectedLink);
