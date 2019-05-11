import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getNodesAsArray, getLinksAsArray, createLink, getLinksIdsWithOpposite } from '../modules/graph';
import Canvas from '../components/Canvas';
import { openDialog, DIALOG_IDS } from '../modules/dialog';
import { selectNode, deselectNode, getSelectedNodes, getNonExistentLinkBetweenSelectedNodes } from '../modules/node-selection';
import { getSelectedLink, selectLink, deselectLink } from '../modules/link-selection';

function mapStateToProps(state) {
  return {
    nodes: getNodesAsArray(state),
    links: getLinksAsArray(state),
    selectedNodes: getSelectedNodes(state),
    virtualLink: getNonExistentLinkBetweenSelectedNodes(state),
    selectedLink: getSelectedLink(state),
    linksIdsWithOpposite: getLinksIdsWithOpposite(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(
      {
        selectNode,
        deselectNode,
        createLink,
        selectLink,
        deselectLink,
      },
      dispatch
    ),
    openNewNode: () => dispatch(openDialog(DIALOG_IDS.NEW_NODE)),
    openEditNode: (node) => dispatch(openDialog(DIALOG_IDS.EDIT_NODE, node)),
    openConfirmDeleteLink: (linkId) => dispatch(openDialog(DIALOG_IDS.CONFIRM_DELETE_LINK, linkId)),
    openConfirmDeleteNode: (nodeIds) => dispatch(openDialog(DIALOG_IDS.CONFIRM_DELETE_NODE, nodeIds)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Canvas);
