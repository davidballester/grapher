import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getNodesAsArray, getLinksAsArray, createLink, getLinksIdsWithOpposite } from '../../ducks/graph';
import Canvas from './canvas.component';
import { openDialog, DIALOG_IDS } from '../../ducks/dialog.duck';
import {
  selectNode,
  deselectNode,
  getSelectedNodes,
  getNonExistentLinkBetweenSelectedNodes,
} from '../../scenes/graph/components/selection/components/nodes/node-selection.duck';
import { getSelectedLink, selectLink, deselectLink } from '../../scenes/graph/components/selection/components/links/link-selection.duck';
import { registerCanvasComponent } from './canvas.duck';

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
        registerCanvasComponent,
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
