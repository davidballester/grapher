export const ADD_NODE_OPEN = 'grapher/AddNode/OPEN';
export const ADD_NODE_CLOSE = 'grapher/AddNode/CLOSE';

const initialState = {
  isOpen: true,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_NODE_OPEN: {
      return {
        ...state,
        isOpen: true,
      };
    }
    case ADD_NODE_CLOSE: {
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

export function openAddNode() {
  return {
    type: ADD_NODE_OPEN,
  };
}

export function closeAddNode() {
  return {
    type: ADD_NODE_CLOSE,
  };
}

function addNodeSelector(state) {
  return state.addNode;
}

export function getIsOpen(state) {
  return addNodeSelector(state).isOpen;
}
