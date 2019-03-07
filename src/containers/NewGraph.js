import { connect } from 'react-redux';

import EditGraphName from '../components/EditGraphName';
import { getIsOpen, closeNewGraph } from '../modules/new-graph';
import { createGraph } from '../modules/graph';
import { openGraphList } from '../modules/graph-list';

function mapStateToProps(state) {
  return {
    isOpen: getIsOpen(state),
    title: 'New graph',
  };
}

function mapDispatchToProps(dispatch) {
  return {
    saveNewGraph: (graphName) => {
      dispatch(createGraph(graphName));
      dispatch(closeNewGraph());
    },
    cancelNewGraph: () => {
      dispatch(closeNewGraph());
      dispatch(openGraphList());
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditGraphName);
