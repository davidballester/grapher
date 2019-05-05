import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SelectedNodes from '../components/SelectedNodes';
import { getSelectedNodes } from '../modules/node-selection';
import { openConfirmDeleteNode } from '../modules/confirm-delete-node';
import { openDialog, DIALOG_IDS } from '../modules/dialog';

function mapStateToProps(state) {
  return {
    nodes: getSelectedNodes(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(
      {
        openConfirmDeleteNode,
      },
      dispatch
    ),
    openEditNode: (node) => dispatch(openDialog(DIALOG_IDS.EDIT_NODE, node)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectedNodes);
