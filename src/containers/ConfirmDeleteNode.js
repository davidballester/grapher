import { connect } from 'react-redux';

import ConfirmDeleteNode from '../components/ConfirmDeleteNode';
import { getIsOpen, closeConfirmDeleteNode, getNodeIds } from '../modules/confirm-delete-node';
import { deleteNode } from '../modules/graph';

function mapStateToProps(state) {
  return {
    isOpen: getIsOpen(state),
    nodeIds: getNodeIds(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    deleteNodes: (nodeIds) => {
      nodeIds.forEach((nodeId) => dispatch(deleteNode(nodeId)));
      dispatch(closeConfirmDeleteNode());
    },
    cancel: () => dispatch(closeConfirmDeleteNode()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmDeleteNode);
