import { connect } from 'react-redux';

import LoggedInPopover from './logged-in-popover.component';
import { getImageUrl, getName, unsetAuth, getAuthProvider } from '../../ducks/auth.duck';

function mapStateToProps(state) {
  return {
    name: getName(state),
    imageUrl: getImageUrl(state),
    authProvider: getAuthProvider(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    unsetAuth: () => dispatch(unsetAuth()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoggedInPopover);
