import { createSelector } from 'reselect';
import * as _entries from 'lodash/entries';

import graphNamesService from '../services/graph-names-service';

export const GRAPH_LIST_OPEN = 'grapher/GraphList/OPEN';

const initialState = graphNamesService.getGraphNames();

export default function reducer(state = initialState, action) {
  return state;
}

export function openGraphList() {
  return {
    type: GRAPH_LIST_OPEN,
  };
}

export function getGraphNames(state) {
  return state.graphList;
}

export const getGraphNamesAsArray = createSelector(
  getGraphNames,
  (graphNames) => _entries(graphNames)
);
