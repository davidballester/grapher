import { connect } from 'react-redux';

import EditGraph from '../components/EditGraph';
import { getIsOpen, closeEditGraph } from '../modules/edit-graph';
import { setGraphName, getName } from '../modules/graph';

function mapStateToProps(state) {
  return {
    isOpen: getIsOpen(state),
    graphName: getName(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setGraphName: (graphName) => {
      dispatch(closeEditGraph());
      dispatch(setGraphName(graphName));
    },
    cancelEditGraph: () => dispatch(closeEditGraph()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditGraph);
