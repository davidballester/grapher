import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getNodesAsArray, getLinksAsArray, createLink } from '../modules/graph';
import { openConfirmDeleteNode } from '../modules/confirm-delete-node';
import Canvas from '../components/Canvas';
import { openDialog, DIALOG_IDS } from '../modules/dialog';
import { selectNode, deselectNode, getSelectedNodes, getNonExistentLinkBetweenSelectedNodes } from '../modules/node-selection';
import { getSelectedLink, selectLink, deselectLink } from '../modules/link-selection';
import { openConfirmDeleteLink } from '../modules/confirm-delete-link';

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
  return {
    ...bindActionCreators(
      {
        selectNode,
        deselectNode,
        createLink,
        openConfirmDeleteNode,
        selectLink,
        deselectLink,
        openConfirmDeleteLink,
      },
      dispatch
    ),
    openNewNode: () => dispatch(openDialog(DIALOG_IDS.NEW_NODE)),
    openEditNode: (node) => dispatch(openDialog(DIALOG_IDS.EDIT_NODE, node)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Canvas);
