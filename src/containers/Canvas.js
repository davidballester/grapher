import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getNodesAsArray, getLinksAsArray, createLink } from '../modules/graph';
import { openConfirmDeleteNode } from '../modules/confirm-delete-node';
import Canvas from '../components/Canvas';
import { openNewNode } from '../modules/new-node';
import { selectNode, deselectNode, getSelectedNodes, getNonExistentLinkBetweenSelectedNodes } from '../modules/node-selection';
import { getSelectedLink, selectLink, deselectLink } from '../modules/link-selection';
import { openConfirmDeleteLink } from '../modules/confirm-delete-link';
import { openEditNode } from '../modules/edit-node';

function mapStateToProps(state) {
  return {
    nodes: getNodesAsArray(state),
    links: getLinksAsArray(state),
    selectedNodes: getSelectedNodes(state),
    virtualLink: getNonExistentLinkBetweenSelectedNodes(state),
    selectedLink: getSelectedLink(state),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      openNewNode,
      selectNode,
      deselectNode,
      createLink,
      openConfirmDeleteNode,
      selectLink,
      deselectLink,
      openConfirmDeleteLink,
      openEditNode,
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Canvas);
