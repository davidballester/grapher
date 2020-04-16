import { connect } from 'react-redux';

import CustomThemeProvider from './custom-theme-provider.component';
import { isDarkMode } from '../../ducks/theme-toggler.duck';

function mapStateToProps(state) {
  return {
    isDarkMode: isDarkMode(state),
  };
}

export default connect(mapStateToProps)(CustomThemeProvider);
