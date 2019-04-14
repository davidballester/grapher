import { connect } from 'react-redux';

import EditNode from '../components/EditNode';
import { getIsOpen, getNode, closeEditNode } from '../modules/edit-node';
import { editNode } from '../modules/graph';

function mapStateToProps(state) {
  return {
    isOpen: getIsOpen(state),
    node: getNode(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    editNode: (node) => {
      dispatch(editNode(node));
      dispatch(closeEditNode());
    },
    cancelEditNode: () => dispatch(closeEditNode()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditNode);
