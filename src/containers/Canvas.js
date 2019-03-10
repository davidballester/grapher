import { connect } from 'react-redux';

import { getNodesAsArray, getLinksAsArray } from '../modules/graph';
import Canvas from '../components/Canvas';
import { openNewNode } from '../modules/new-node';
import { selectNode, getSelectedNode } from '../modules/node-selection';

function mapStateToProps(state) {
  return {
    nodes: getNodesAsArray(state),
    links: getLinksAsArray(state),
    selectedNode: getSelectedNode(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    openNewNode: () => dispatch(openNewNode()),
    selectNode: (node) => dispatch(selectNode(node)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Canvas);
