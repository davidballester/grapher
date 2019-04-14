import { connect } from 'react-redux';

import EditNode from '../components/EditNode';
import { getIsOpen, getNode, closeEditNode } from '../modules/edit-node';
import { editNode, getNodesIds } from '../modules/graph';

function mapStateToProps(state) {
  return {
    isOpen: getIsOpen(state),
    node: getNode(state),
    nodesIds: getNodesIds(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    editNode: (oldId, node) => {
      dispatch(editNode(oldId, node));
      dispatch(closeEditNode());
    },
    cancelEditNode: () => dispatch(closeEditNode()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditNode);
