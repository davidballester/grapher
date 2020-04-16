import { connect } from 'react-redux';

import ThemeToggler from './theme-toggler.component';
import { toggleTheme, initializeTheme, isDarkMode } from '../../ducks/theme-toggler.duck';

function mapStateToProps(state) {
  return {
    isDarkMode: isDarkMode(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toggleTheme: () => dispatch(toggleTheme()),
    initializeTheme: (darkMode) => dispatch(initializeTheme(darkMode)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ThemeToggler);
