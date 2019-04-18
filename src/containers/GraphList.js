import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import GraphList from '../components/GraphList';
import { loadGraph } from '../modules/graph';
import { getGraphNames } from '../modules/graph-names';
import { openNewGraph } from '../modules/new-graph';

function mapStateToProps(state) {
  return {
    graphNames: getGraphNames(state),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      openNewGraph,
      loadGraph,
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GraphList);
