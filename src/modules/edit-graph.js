export const EDIT_GRAPH_OPEN = 'grapher/EditGraph/OPEN';
export const EDIT_GRAPH_CLOSE = 'grapher/EditGraph/CLOSE';

const initialState = {
  isOpen: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case EDIT_GRAPH_OPEN: {
      return {
        ...state,
        isOpen: true,
      };
    }
    case EDIT_GRAPH_CLOSE: {
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

export function openEditGraph() {
  return {
    type: EDIT_GRAPH_OPEN,
  };
}

export function closeEditGraph() {
  return {
    type: EDIT_GRAPH_CLOSE,
  };
}

function editGraphSelector(state) {
  return state.editGraph;
}

export function getIsOpen(state) {
  return editGraphSelector(state).isOpen;
}
