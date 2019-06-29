import { createSelector } from 'reselect';

import { MAX_SELECTED_NODES } from '../../../../../../constants';
import { getLinks, GRAPH_DELETE_NODE, GRAPH_EDIT_NODE } from '../../../../../../ducks/graph';
import linksService from '../../../../../../services/links.service';

export const NODE_SELECTION_SELECT = 'grapher/NodeSelection/SELECT';
export const NODE_SELECTION_DESELECT = 'grapher/NodeSelection/DESELECT';

const initialState = {
  selectedNodes: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case NODE_SELECTION_SELECT: {
      let selectedNodes = state.selectedNodes;
      // prettier-ignore
      return {
        ...state,
        selectedNodes: [
          ...selectedNodes.slice(selectedNodes.length === MAX_SELECTED_NODES ? 1 : 0),
          action.payload,
        ],
      };
    }
    case NODE_SELECTION_DESELECT: {
      return {
        ...state,
        selectedNodes: state.selectedNodes.filter((node) => node.id !== action.payload),
      };
    }
    case GRAPH_DELETE_NODE: {
      return {
        ...state,
        selectedNodes: state.selectedNodes.filter((node) => node.id !== action.payload),
      };
    }
    case GRAPH_EDIT_NODE: {
      const { oldId, node: editedNode } = action.payload;
      return {
        ...state,
        selectedNodes: state.selectedNodes.map((node) => (node.id === oldId ? editedNode : node)),
      };
    }
    default: {
      return state;
    }
  }
}

export function selectNode(node) {
  return {
    type: NODE_SELECTION_SELECT,
    payload: node,
  };
}

export function deselectNode(nodeId) {
  return {
    type: NODE_SELECTION_DESELECT,
    payload: nodeId,
  };
}

function nodeSelectionSelector(state) {
  return state.nodeSelection;
}

export function getSelectedNodes(state) {
  return nodeSelectionSelector(state).selectedNodes;
}

export const getNonExistentLinkBetweenSelectedNodes = createSelector(
  getSelectedNodes,
  getLinks,
  (selectedNodes = [], links = {}) => {
    if (selectedNodes.length === 2) {
      const [source, target] = selectedNodes.map((n) => n.id);
      const linkId = linksService.getId({ source, target });
      const link = links[linkId];
      if (!link) {
        return { id: linkId, source, target };
      }
    }
  }
);
