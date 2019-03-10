export const NODE_SELECTION_SELECT = 'grapher/NodeSelection/SELECT';
export const NODE_SELECTION_DESELECT = 'grapher/NodeSelection/DESELECT';

const initialState = {
  selectedNode: undefined,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case NODE_SELECTION_SELECT: {
      return {
        ...state,
        selectedNode: action.payload,
      };
    }
    case NODE_SELECTION_DESELECT: {
      return {
        ...state,
        selectedNode: undefined,
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

export function deselectNode() {
  return {
    type: NODE_SELECTION_DESELECT,
  };
}

function nodeSelectionSelector(state) {
  return state.nodeSelection;
}

export function getSelectedNode(state) {
  return nodeSelectionSelector(state).selectedNode;
}
