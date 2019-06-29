import { connect } from 'react-redux';

import NewGraph from './new-graph.component';
import { createGraph } from '../../ducks/graph';
import { openGraphList } from '../../ducks/navigation';

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
