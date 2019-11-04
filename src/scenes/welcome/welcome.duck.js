import { createSelector } from 'reselect';
import entries from 'lodash/entries';

import graphNamesService from '../../services/graph-names.service';
import { GRAPH_SET_NAME, GRAPH_CREATE, GRAPH_DELETE } from '../../ducks/graph';

const initialState = graphNamesService.getGraphNames();

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GRAPH_CREATE: {
      const { id, name } = action.payload;
      return {
        ...state,
        [id]: name,
      };
    }
    case GRAPH_DELETE: {
      const { payload: graphId } = action;
      const newState = { ...state };
      delete newState[graphId];
      return newState;
    }
    case GRAPH_SET_NAME: {
      const { id, name } = action.payload;
      return {
        ...state,
        [id]: name,
      };
    }
    default: {
      return state;
    }
  }
}

export function getGraphNames(state) {
  return state.welcome;
}

export const getGraphNamesAsArray = createSelector(
  getGraphNames,
  (graphNames) => entries(graphNames)
);
