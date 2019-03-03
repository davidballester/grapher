export const GRAPHS_LIST_OPEN = 'grapher/GraphList/OPEN';
export const GRAPHS_LIST_CLOSE = 'grapher/GraphList/CLOSE';

const initialState = {
  isOpen: true,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GRAPHS_LIST_OPEN: {
      return {
        ...state,
        isOpen: true,
      };
    }
    case GRAPHS_LIST_CLOSE: {
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

export function openGraphList() {
  return {
    type: GRAPHS_LIST_OPEN,
  };
}

export function closeGraphList() {
  return {
    type: GRAPHS_LIST_CLOSE,
  };
}

function graphListSelector(state) {
  return state.graphList;
}

export function getIsOpen(state) {
  return graphListSelector(state).isOpen;
}
