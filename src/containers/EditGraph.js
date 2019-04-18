import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import EditGraph from '../components/EditGraph';
import { loadGraph, getName } from '../modules/graph';

function mapStateToProps(state, ownProps) {
  return {
    graphName: ownProps.match.params.graphName,
    loadedGraphName: getName(state),
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
  )(EditGraph)
);
