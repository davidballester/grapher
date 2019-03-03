export const GRAPH_SET_NAME = 'grapher/Graph/SET_NAME';

const initialState = {
  name: '',
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GRAPH_SET_NAME: {
      return {
        ...state,
        name: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}

export function setNameGraph(graphName) {
  return {
    type: GRAPH_SET_NAME,
    payload: graphName,
  };
}

function graphSelector(state) {
  return state.graph;
}

export function getName(state) {
  return graphSelector(state).name;
}
