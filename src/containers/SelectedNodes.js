import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SelectedNodes from '../components/SelectedNodes';
import { getSelectedNodes } from '../modules/node-selection';
import { openConfirmDeleteNode } from '../modules/confirm-delete-node';
import { openEditNode } from '../modules/edit-node';

function mapStateToProps(state) {
  return {
    nodes: getSelectedNodes(state),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      openConfirmDeleteNode,
      openEditNode,
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectedNodes);
