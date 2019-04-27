import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import Graph from '../components/Graph';
import { loadGraph, getId } from '../modules/graph';

function mapStateToProps(state, ownProps) {
  return {
    graphId: ownProps.match.params.graphId,
    loadedGraphId: getId(state),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      loadGraph,
    },
    dispatch
  );
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Graph)
);
