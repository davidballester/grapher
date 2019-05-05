import { connect } from 'react-redux';

import SelectedNodes from '../components/SelectedNodes';
import { getSelectedNodes } from '../modules/node-selection';
import { openDialog, DIALOG_IDS } from '../modules/dialog';

function mapStateToProps(state) {
  return {
    nodes: getSelectedNodes(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    openEditNode: (node) => dispatch(openDialog(DIALOG_IDS.EDIT_NODE, node)),
    openConfirmDeleteNode: (nodeIds) => dispatch(openDialog(DIALOG_IDS.CONFIRM_DELETE_NODE, nodeIds)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectedNodes);
