import { connect } from 'react-redux';

import NewNode from '../components/NewNode';
import { getIsOpen, closeNewNode } from '../modules/new-node';
import { createNode } from '../modules/graph';

function mapStateToProps(state) {
  return {
    isOpen: getIsOpen(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    saveNewNode: (node) => {
      dispatch(createNode(node));
      dispatch(closeNewNode());
    },
    cancelNewNode: () => dispatch(closeNewNode()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewNode);
