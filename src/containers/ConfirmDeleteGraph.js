import { connect } from 'react-redux';

import ConfirmDeleteGraph from '../components/ConfirmDeleteGraph';
import { getIsOpen, closeConfirmDeleteGraph, getGraphName } from '../modules/confirm-delete-graph';
import { deleteGraph, getId } from '../modules/graph';

function mapStateToProps(state) {
  return {
    isOpen: getIsOpen(state),
    graphName: getGraphName(state),
    graphId: getId(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    deleteGraph: (graphId) => {
      dispatch(deleteGraph(graphId));
      dispatch(closeConfirmDeleteGraph());
    },
    cancel: () => dispatch(closeConfirmDeleteGraph()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmDeleteGraph);
