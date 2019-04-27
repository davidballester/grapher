export const CONFIRM_DELETE_GRAPH_OPEN = 'grapher/ConfirmDeleteGraph/OPEN';
export const CONFIRM_DELETE_GRAPH_CLOSE = 'grapher/ConfirmDeleteGraph/CLOSE';

const initialState = {
  isOpen: false,
  graphName: undefined,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CONFIRM_DELETE_GRAPH_OPEN: {
      return {
        ...state,
        isOpen: true,
        graphName: action.payload,
      };
    }
    case CONFIRM_DELETE_GRAPH_CLOSE: {
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

export function openConfirmDeleteGraph(graphName) {
  return {
    type: CONFIRM_DELETE_GRAPH_OPEN,
    payload: graphName,
  };
}

export function closeConfirmDeleteGraph() {
  return {
    type: CONFIRM_DELETE_GRAPH_CLOSE,
  };
}

function confirmDeleteGraphSelector(state) {
  return state.confirmDeleteGraph;
}

export function getIsOpen(state) {
  return confirmDeleteGraphSelector(state).isOpen;
}

export function getGraphName(state) {
  return confirmDeleteGraphSelector(state).graphName;
}
