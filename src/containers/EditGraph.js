import { connect } from 'react-redux';

import EditGraph from '../components/EditGraph';
import { getIsOpen, closeDialog, DIALOG_IDS } from '../modules/dialog';
import { setGraphName, getName, getId } from '../modules/graph';

function mapStateToProps(state) {
  return {
    isOpen: getIsOpen(state, DIALOG_IDS.EDIT_GRAPH),
    graphName: getName(state),
    graphId: getId(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setGraphName: (graphId, graphName) => {
      dispatch(closeDialog(DIALOG_IDS.EDIT_GRAPH));
      dispatch(setGraphName(graphId, graphName));
    },
    cancelEditGraph: () => dispatch(closeDialog(DIALOG_IDS.EDIT_GRAPH)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditGraph);
