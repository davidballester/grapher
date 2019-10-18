import { connect } from 'react-redux';

import SelectedLink from './selected-link.component';
import { getSelectedLink } from './link-selection.duck';

function mapStateToProps(state) {
  return {
    link: getSelectedLink(state),
  };
}

export default connect(mapStateToProps)(SelectedLink);
