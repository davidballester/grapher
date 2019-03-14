import { MAX_SELECTED_NODES } from '../constants';

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
