export const DIALOG_IDS = {
  EDIT_GRAPH: 'editgraph',
  CONFIRM_DELETE_GRAPH: 'confirmdeletegraph',
  EXPORT_GRAPH: 'exportgraph',
};

export const DIALOG_OPEN = 'grapher/EditGraph/OPEN';
export const DIALOG_CLOSE = 'grapher/EditGraph/CLOSE';

const initialState = {};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case DIALOG_OPEN: {
      const { dialogId, metadata } = action.payload;
      return {
        ...state,
        [dialogId]: {
          isOpen: true,
          metadata,
        },
      };
    }
    case DIALOG_CLOSE: {
      const dialogId = action.payload;
      return {
        ...state,
        [dialogId]: {
          isOpen: false,
          metadata: undefined,
        },
      };
    }
    default: {
      return state;
    }
  }
}

export function openDialog(dialogId, metadata) {
  return {
    type: DIALOG_OPEN,
    payload: {
      dialogId,
      metadata,
    },
  };
}

export function closeDialog(dialogId) {
  return {
    type: DIALOG_CLOSE,
    payload: dialogId,
  };
}

function dialogSelector(state) {
  return state.dialog;
}

function getDialogData(state, dialogId) {
  return dialogSelector(state)[dialogId];
}

export function getIsOpen(state, dialogId) {
  const dialogData = getDialogData(state, dialogId);
  return !!dialogData && dialogData.isOpen;
}

export function getMetadata(state, dialogId) {
  const dialogData = getDialogData(state, dialogId);
  return !!dialogData ? dialogData.metadata : undefined;
}
