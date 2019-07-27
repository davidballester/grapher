import { createSelector } from 'reselect';

import { MAX_SELECTED_NODES } from '../../../../../../constants';
import { GRAPH_DELETE_NODE, GRAPH_EDIT_NODE, getLinksAsArray } from '../../../../../../ducks/graph';

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
  getLinksAsArray,
  (selectedNodes = [], links = []) => {
    if (selectedNodes.length === 2) {
      const [source, target] = selectedNodes.map((n) => n.id);
      const link = links.find(({ source: ls, target: lt }) => (ls === source || ls === target) && (lt === target || lt === source));
      if (!link) {
        return { source, target };
      }
    }
  }
);
