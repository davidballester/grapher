import { GRAPH_CREATE, GRAPH_LOAD_SUCCESS } from '../../../../../../ducks/graph';

export const LINK_SELECTION_SELECT = 'grapher/LinkSelection/SELECT';
export const LINK_SELECTION_DESELECT = 'grapher/LinkSelection/DESELECT';

const initialState = {
  selectedLink: undefined,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LINK_SELECTION_SELECT: {
      // prettier-ignore
      return {
        ...state,
        selectedLink: action.payload,
      };
    }
    case LINK_SELECTION_DESELECT: {
      return {
        ...state,
        selectedLink: undefined,
      };
    }
    case GRAPH_CREATE: {
      return {
        ...state,
        selectedLink: undefined,
      };
    }
    case GRAPH_LOAD_SUCCESS: {
      return {
        ...state,
        selectedLink: undefined,
      };
    }
    default: {
      return state;
    }
  }
}

export function selectLink(link) {
  return {
    type: LINK_SELECTION_SELECT,
    payload: link,
  };
}

export function deselectLink() {
  return {
    type: LINK_SELECTION_DESELECT,
  };
}

function linkSelectionSelector(state) {
  return state.linkSelection;
}

export function getSelectedLink(state) {
  return linkSelectionSelector(state).selectedLink;
}
