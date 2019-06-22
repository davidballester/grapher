import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getNodes, getLinks, processSubgraph, closeSubgraphCreator, importSubgraph } from '../modules/subgraph-creator';
import SubgraphCreator from '../components/SubgraphCreator';

function mapStateToProps(state) {
  return {
    nodes: getNodes(state),
    links: getLinks(state),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ processSubgraph, close: closeSubgraphCreator, importSubgraph }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubgraphCreator);
