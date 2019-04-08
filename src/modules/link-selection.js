import { GRAPH_DELETE_LINK, GRAPH_DELETE_NODE } from './graph';

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
    case GRAPH_DELETE_LINK: {
      const selectedLinkId = !!state.selectedLink ? state.selectedLink.id : undefined;
      return {
        ...state,
        selectedLink: selectedLinkId === action.payload ? undefined : state.selectedLink,
      };
    }
    case GRAPH_DELETE_NODE: {
      const nodeId = action.payload;
      const { source: selectedLinkSource, target: selectedLinkTarget } = state.selectedLink || {};
      return {
        ...state,
        selectedLink: nodeId !== selectedLinkSource && nodeId !== selectedLinkTarget ? state.selectedLink : undefined,
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
