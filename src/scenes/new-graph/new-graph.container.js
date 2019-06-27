import { connect } from 'react-redux';

import NewGraph from './new-graph.component';
import { createGraph } from '../../scenes/graph/ducks';
import { openGraphList } from '../graph-list/graph-list.duck';

function mapStateToProps() {
  return {
    title: 'New graph',
  };
}

function mapDispatchToProps(dispatch) {
  return {
    saveNewGraph: (graphName) => dispatch(createGraph({ name: graphName })),
    cancelNewGraph: () => dispatch(openGraphList()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewGraph);
