import { connect } from 'react-redux';

import SelectedNodes from './selected-nodes.component';
import { getSelectedNodes } from './node-selection.duck';

function mapStateToProps(state) {
  return {
    nodes: getSelectedNodes(state),
  };
}

export default connect(mapStateToProps)(SelectedNodes);
