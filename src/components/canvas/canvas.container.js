import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getNodesAsArray, getLinksAsArray, getLinksIdsWithOpposite } from '../../ducks/graph';
import Canvas from './canvas.component';
import { selectNode, deselectNode, getSelectedNodes } from '../../scenes/graph/components/selection/components/nodes/node-selection.duck';
import { getSelectedLink, selectLink, deselectLink } from '../../scenes/graph/components/selection/components/links/link-selection.duck';
import { registerCanvasComponent } from './canvas.duck';

function mapStateToProps(state) {
  return {
    nodes: getNodesAsArray(state),
    links: getLinksAsArray(state),
    selectedNodes: getSelectedNodes(state),
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
        selectLink,
        deselectLink,
        registerCanvasComponent,
      },
      dispatch
    ),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Canvas);
