import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { isOpen, dismissOnboarding } from './onboarding.duck';
import Onboarding from './onboarding.component';

const mapStateToProps = (state) => ({
  open: isOpen(state),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      dismiss: dismissOnboarding,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Onboarding);
