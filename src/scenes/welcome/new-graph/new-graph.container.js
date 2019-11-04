import { connect } from 'react-redux';

import NewGraph from './new-graph.component';
import { createGraph } from '../../../ducks/graph';
import { closeDialog, DIALOG_IDS, getIsOpen } from '../../../ducks/dialog.duck';

function mapStateToProps(state) {
  return {
    isOpen: getIsOpen(state, DIALOG_IDS.NEW_GRAPH),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    saveNewGraph: (graphName, includeSampleGraph) => dispatch(createGraph({ name: graphName }, includeSampleGraph)),
    cancelNewGraph: () => dispatch(closeDialog(DIALOG_IDS.NEW_GRAPH)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewGraph);
