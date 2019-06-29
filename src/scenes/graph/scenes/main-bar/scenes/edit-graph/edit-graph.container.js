import { connect } from 'react-redux';

import EditGraph from './edit-graph.component';
import { getIsOpen, closeDialog, DIALOG_IDS } from '../../../../../../ducks/dialog';
import { setGraphName, getName, getId } from '../../../../../../ducks/graph';

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
