import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import Graph from './graph.component';
import { loadGraph, getId, getName, getLoadError } from '../../ducks/graph';
import { openGraphList } from '../../ducks/navigation.duck';

function mapStateToProps(state, ownProps) {
  return {
    graphId: ownProps.match.params.graphId,
    loadedGraphId: getId(state),
    graphName: getName(state),
    loadError: getLoadError(state),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      loadGraph,
      openGraphList,
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
