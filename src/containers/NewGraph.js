import { connect } from 'react-redux';

import EditGraphName from '../components/EditGraphName';
import { createGraph } from '../modules/graph';
import { openGraphList } from '../modules/graph-list';

function mapStateToProps() {
  return {
    title: 'New graph',
  };
}

function mapDispatchToProps(dispatch) {
  return {
    saveNewGraph: (graphName) => dispatch(createGraph(graphName)),
    cancelNewGraph: () => dispatch(openGraphList()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditGraphName);
