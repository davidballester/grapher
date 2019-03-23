import { connect } from 'react-redux';

import { getNodesAsArray, getLinksAsArray } from '../modules/graph';
import Canvas from '../components/Canvas';
import { openNewNode } from '../modules/new-node';
import { selectNode, deselectNode, getSelectedNodes, getNonExistentLinkBetweenSelectedNodes } from '../modules/node-selection';

function mapStateToProps(state) {
  return {
    nodes: getNodesAsArray(state),
    links: getLinksAsArray(state),
    selectedNodes: getSelectedNodes(state),
    virtualLink: getNonExistentLinkBetweenSelectedNodes(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    openNewNode: () => dispatch(openNewNode()),
    selectNode: (node) => dispatch(selectNode(node)),
    deselectNode: (nodeId) => dispatch(deselectNode(nodeId)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Canvas);
