import { connect } from 'react-redux';

import MainBar from '../components/MainBar';
import { getName } from '../modules/graph';

function mapStateToProps(state) {
  return {
    graphName: getName(state),
  };
}

export default connect(mapStateToProps)(MainBar);
