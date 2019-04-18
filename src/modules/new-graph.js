export const NEW_GRAPH_OPEN = 'grapher/NewGraph/OPEN';

export default function reducer(state = {}, action) {
  return state;
}

export function openNewGraph() {
  return {
    type: NEW_GRAPH_OPEN,
  };
}
