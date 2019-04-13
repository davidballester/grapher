export const CONFIRM_DELETE_LINK_OPEN = 'grapher/ConfirmDeleteLink/OPEN';
export const CONFIRM_DELETE_LINK_CLOSE = 'grapher/ConfirmDeleteLink/CLOSE';

const initialState = {
  isOpen: false,
  linkId: undefined,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CONFIRM_DELETE_LINK_OPEN: {
      return {
        ...state,
        isOpen: true,
        linkId: action.payload,
      };
    }
    case CONFIRM_DELETE_LINK_CLOSE: {
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

export function openConfirmDeleteLink(linkId) {
  return {
    type: CONFIRM_DELETE_LINK_OPEN,
    payload: linkId,
  };
}

export function closeConfirmDeleteLink() {
  return {
    type: CONFIRM_DELETE_LINK_CLOSE,
  };
}

function confirmDeleteLinkSelector(state) {
  return state.confirmDeleteLink;
}

export function getIsOpen(state) {
  return confirmDeleteLinkSelector(state).isOpen;
}

export function getLinkId(state) {
  return confirmDeleteLinkSelector(state).linkId;
}
