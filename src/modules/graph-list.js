export const GRAPH_LIST_OPEN = 'grapher/GraphList/OPEN';

export default function reducer(state = {}, action) {
  return state;
}

export function openGraphList() {
  return {
    type: GRAPH_LIST_OPEN,
  };
}
