export const NEW_GRAPH_OPEN = 'grapher/NewGraph/OPEN';
export const NEW_GRAPH_CLOSE = 'grapher/NewGraph/CLOSE';

const initialState = {
  isOpen: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case NEW_GRAPH_OPEN: {
      return {
        ...state,
        isOpen: true,
      };
    }
    case NEW_GRAPH_CLOSE: {
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

export function openNewGraph() {
  return {
    type: NEW_GRAPH_OPEN,
  };
}

export function closeNewGraph() {
  return {
    type: NEW_GRAPH_CLOSE,
  };
}

function newGraphSelector(state) {
  return state.newGraph;
}

export function getIsOpen(state) {
  return newGraphSelector(state).isOpen;
}
