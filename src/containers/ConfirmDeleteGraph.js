import { connect } from 'react-redux';

import ConfirmDeleteGraph from '../components/ConfirmDeleteGraph';
import { getIsOpen, closeConfirmDeleteGraph, getGraphName } from '../modules/confirm-delete-graph';
import { deleteGraph } from '../modules/graph';

function mapStateToProps(state) {
  return {
    isOpen: getIsOpen(state),
    graphName: getGraphName(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    deleteGraph: () => {
      dispatch(deleteGraph());
      dispatch(closeConfirmDeleteGraph());
    },
    cancel: () => dispatch(closeConfirmDeleteGraph()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmDeleteGraph);
