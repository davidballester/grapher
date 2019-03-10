export const NEW_NODE_OPEN = 'grapher/NewNode/OPEN';
export const NEW_NODE_CLOSE = 'grapher/NewNode/CLOSE';

const initialState = {
  isOpen: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case NEW_NODE_OPEN: {
      return {
        ...state,
        isOpen: true,
      };
    }
    case NEW_NODE_CLOSE: {
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

export function openNewNode() {
  return {
    type: NEW_NODE_OPEN,
  };
}

export function closeNewNode() {
  return {
    type: NEW_NODE_CLOSE,
  };
}

function newNodeSelector(state) {
  return state.newNode;
}

export function getIsOpen(state) {
  return newNodeSelector(state).isOpen;
}
