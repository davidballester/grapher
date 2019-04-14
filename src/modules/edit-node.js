export const EDIT_NODE_OPEN = 'grapher/EditNode/OPEN';
export const EDIT_NODE_CLOSE = 'grapher/EditNode/CLOSE';

const initialState = {
  node: undefined,
  isOpen: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case EDIT_NODE_OPEN: {
      return {
        ...state,
        isOpen: true,
        node: action.payload,
      };
    }
    case EDIT_NODE_CLOSE: {
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

export function openEditNode(node) {
  return {
    type: EDIT_NODE_OPEN,
    payload: node,
  };
}

export function closeEditNode() {
  return {
    type: EDIT_NODE_CLOSE,
  };
}

function editNodeSelector(state) {
  return state.editNode;
}

export function getIsOpen(state) {
  return editNodeSelector(state).isOpen;
}

export function getNode(state) {
  return editNodeSelector(state).node;
}
