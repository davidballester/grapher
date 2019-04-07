import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SelectedNodes from '../components/SelectedNodes';
import { getSelectedNodes } from '../modules/node-selection';
import { openConfirmDeleteNode } from '../modules/confirm-delete-node';

function mapStateToProps(state) {
  return {
    nodes: getSelectedNodes(state),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ openConfirmDeleteNode }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectedNodes);
