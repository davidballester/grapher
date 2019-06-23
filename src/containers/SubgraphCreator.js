import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getNodes, getLinks, processSubgraph, closeSubgraphCreator, importSubgraph } from '../modules/subgraph-creator';
import SubgraphCreator from '../components/SubgraphCreator';
import { loadGraph, getId } from '../modules/graph';

function mapStateToProps(state, ownProps) {
  return {
    nodes: getNodes(state),
    links: getLinks(state),
    graphId: ownProps.match.params.graphId,
    loadedGraphId: getId(state),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ processSubgraph, close: closeSubgraphCreator, importSubgraph, loadGraph }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubgraphCreator);
