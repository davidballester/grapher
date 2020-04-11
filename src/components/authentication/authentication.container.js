import { connect } from 'react-redux';

import Authentication from './authentication.component';
import { setAuth, isSignedIn, getImageUrl, getGoogleAuth, setGoogleAuth } from '../../ducks/auth.duck';

function mapStateToProps(state) {
  return {
    isSignedIn: isSignedIn(state),
    imageUrl: getImageUrl(state),
    googleAuth: getGoogleAuth(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setAuth: (name, imageUrl) => dispatch(setAuth(name, imageUrl)),
    setGoogleAuth: (googleAuth) => dispatch(setGoogleAuth(googleAuth)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Authentication);
