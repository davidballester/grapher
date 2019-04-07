import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getNodesAsArray, getLinksAsArray, createLink, deleteNode } from '../modules/graph';
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
  return bindActionCreators(
    {
      openNewNode,
      selectNode,
      deselectNode,
      createLink,
      deleteNode,
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Canvas);
