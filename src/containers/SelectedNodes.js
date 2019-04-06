import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SelectedNodes from '../components/SelectedNodes';
import { getSelectedNodes } from '../modules/node-selection';
import { deleteNode } from '../modules/graph';

function mapStateToProps(state) {
  return {
    nodes: getSelectedNodes(state),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ deleteNode }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectedNodes);
