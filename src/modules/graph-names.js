const initialState = [];

export default function reducer(state = initialState, action) {
  switch (action.type) {
    default: {
      return state;
    }
  }
}

export function getGraphNames(state) {
  return state.graphNames;
}
