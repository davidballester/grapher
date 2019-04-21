import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import MainBar from '../components/MainBar';
import { getName } from '../modules/graph';
import { openEditGraph } from '../modules/edit-graph';

function mapStateToProps(state) {
  return {
    graphName: getName(state),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      openEditGraph,
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainBar);
