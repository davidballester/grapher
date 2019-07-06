import uuid from 'uuid/v4';
import { createSelector } from 'reselect';

// Actions
export const GROUPS_ADD = 'grapher/groups/ADD';
export const GROUPS_REMOVE = 'grapher/groups/REMOVE';
export const GROUPS_UPDATE = 'grapher/groups/UPDATE';

export function addGroup(group) {
  return {
    type: GROUPS_ADD,
    payload: {
      id: uuid(),
      ...group,
    },
  };
}

export function removeGroup(groupId) {
  return {
    type: GROUPS_REMOVE,
    payload: groupId,
  };
}

export function updateGroup(group) {
  return {
    type: GROUPS_UPDATE,
    payload: group,
  };
}

// Reducer
const initialState = {};
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GROUPS_ADD: {
      const group = action.payload;
      return {
        ...state,
        [group.id]: group,
      };
    }
    case GROUPS_REMOVE: {
      const groupId = action.payload;
      const newState = { ...state };
      delete newState[groupId];
      return newState;
    }
    case GROUPS_UPDATE: {
      const group = action.payload;
      return {
        ...state,
        [group.id]: group,
      };
    }
    default: {
      return state;
    }
  }
}

// Selectors
const getGroupsSubstate = (state) => state.groups;

export const getGroupsAsArray = createSelector(
  getGroupsSubstate,
  (groups) => Object.keys(groups).map((groupId) => groups[groupId])
);
