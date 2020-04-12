import { connect } from 'react-redux';

import Authentication from './authentication.component';
import { setAuth, isSignedIn, getImageUrl, getAuthProvider, setAuthProvider } from '../../ducks/auth.duck';

function mapStateToProps(state) {
  return {
    isSignedIn: isSignedIn(state),
    imageUrl: getImageUrl(state),
    authProvider: getAuthProvider(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setAuth: (name, imageUrl) => dispatch(setAuth(name, imageUrl)),
    setAuthProvider: (authProvider) => dispatch(setAuthProvider(authProvider)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Authentication);
