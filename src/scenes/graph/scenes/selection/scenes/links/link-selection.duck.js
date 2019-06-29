import { GRAPH_DELETE_LINK, GRAPH_DELETE_NODE, GRAPH_EDIT_NODE, GRAPH_EDIT_LINK } from '../../../../../../ducks/graph';
import linksService from '../../../../../../services/links.service';

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
      const { id: selectedLinkId } = state.selectedLink || {};
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
    case GRAPH_EDIT_NODE: {
      const { oldId, node } = action.payload;
      let selectedLink;
      if (state.selectedLink) {
        selectedLink = {
          source: state.selectedLink.source === oldId ? node.id : state.selectedLink.source,
          target: state.selectedLink.target === oldId ? node.id : state.selectedLink.target,
        };
        selectedLink.id = linksService.getId(selectedLink);
      }
      return {
        ...state,
        selectedLink,
      };
    }
    case GRAPH_EDIT_LINK: {
      const { id: selectedLinkId } = state.selectedLink || {};
      const link = action.payload;
      return {
        ...state,
        selectedLink: selectedLinkId === link.id ? link : state.selectedLink,
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
