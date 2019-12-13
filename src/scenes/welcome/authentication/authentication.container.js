import { connect } from 'react-redux';

import Authentication from './authentication.component';
import { setAuth, unsetAuth, isSignedIn, getImageUrl } from '../../../ducks/auth.duck';

function mapStateToProps(state) {
  return {
    isSignedIn: isSignedIn(state),
    imageUrl: getImageUrl(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setAuth: (name, imageUrl) => dispatch(setAuth(name, imageUrl)),
    unsetAuth: () => dispatch(unsetAuth()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Authentication);
