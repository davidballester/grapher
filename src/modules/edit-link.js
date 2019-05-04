export const EDIT_LINK_OPEN = 'grapher/EditLink/OPEN';
export const EDIT_LINK_CLOSE = 'grapher/EditLink/CLOSE';

const initialState = {
  link: undefined,
  isOpen: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case EDIT_LINK_OPEN: {
      return {
        ...state,
        isOpen: true,
        link: action.payload,
      };
    }
    case EDIT_LINK_CLOSE: {
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

export function openEditLink(link) {
  return {
    type: EDIT_LINK_OPEN,
    payload: link,
  };
}

export function closeEditLink() {
  return {
    type: EDIT_LINK_CLOSE,
  };
}

function editLinkSelector(state) {
  return state.editLink;
}

export function getIsOpen(state) {
  return editLinkSelector(state).isOpen;
}

export function getLink(state) {
  return editLinkSelector(state).link;
}
