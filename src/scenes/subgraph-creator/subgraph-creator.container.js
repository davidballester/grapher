import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getNodes, getLinks, processSubgraph, closeSubgraphCreator, importSubgraph } from '../../ducks/subgraph-creator.duck';
import SubgraphCreator from './subgraph-creator.component';
import { loadGraph, getId } from '../../ducks/graph';

function mapStateToProps(state, ownProps) {
  return {
    nodes: getNodes(state),
    links: getLinks(state),
    graphId: ownProps.match.params.graphId,
    loadedGraphId: getId(state),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ processSubgraph, close: closeSubgraphCreator, closeSubgraphCreator, importSubgraph, loadGraph }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubgraphCreator);
