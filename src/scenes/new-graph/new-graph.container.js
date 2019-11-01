import { connect } from 'react-redux';

import NewGraph from './new-graph.component';
import { createGraph } from '../../ducks/graph';
import { openGraphList } from '../../ducks/navigation.duck';

function mapStateToProps() {
  return {
    title: 'New graph',
  };
}

function mapDispatchToProps(dispatch) {
  return {
    saveNewGraph: (graphName, includeSampleGraph) => dispatch(createGraph({ name: graphName }, includeSampleGraph)),
    openGraphList: () => dispatch(openGraphList()),
    cancelNewGraph: () => dispatch(openGraphList()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewGraph);
