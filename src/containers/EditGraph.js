import { connect } from 'react-redux';

import EditGraph from '../components/EditGraph';
import { getIsOpen, closeEditGraph } from '../modules/edit-graph';
import { setGraphName, getName, getId } from '../modules/graph';

function mapStateToProps(state) {
  return {
    isOpen: getIsOpen(state),
    graphName: getName(state),
    graphId: getId(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setGraphName: (graphId, graphName) => {
      dispatch(closeEditGraph());
      dispatch(setGraphName(graphId, graphName));
    },
    cancelEditGraph: () => dispatch(closeEditGraph()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditGraph);
