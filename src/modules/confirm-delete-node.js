export const CONFIRM_DELETE_NODE_OPEN = 'grapher/ConfirmDeleteNode/OPEN';
export const CONFIRM_DELETE_NODE_CLOSE = 'grapher/ConfirmDeleteNode/CLOSE';

const initialState = {
  isOpen: false,
  nodeIds: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CONFIRM_DELETE_NODE_OPEN: {
      return {
        ...state,
        isOpen: true,
        nodeIds: action.payload,
      };
    }
    case CONFIRM_DELETE_NODE_CLOSE: {
      return {
        ...state,
        isOpen: false,
      };
    }
    default: {
      return state;
    }
  }
}

export function openConfirmDeleteNode(nodeIds) {
  return {
    type: CONFIRM_DELETE_NODE_OPEN,
    payload: nodeIds,
  };
}

export function closeConfirmDeleteNode() {
  return {
    type: CONFIRM_DELETE_NODE_CLOSE,
  };
}

function confirmDeleteNodeSelector(state) {
  return state.confirmDeleteNode;
}

export function getIsOpen(state) {
  return confirmDeleteNodeSelector(state).isOpen;
}

export function getNodeIds(state) {
  return confirmDeleteNodeSelector(state).nodeIds;
}
