import {
  GRAPH_SET_NAME,
  GRAPH_CREATE,
  GRAPH_LOAD_SUCCESS,
  GRAPH_LOAD_ERROR,
  GRAPH_SET_CONTENTS,
  GRAPH_SET_TEXT,
  GRAPH_SET_TEXT_ERROR,
} from './graph.actions';

const initialState = {
  id: 'unknown',
  name: 'unknown',
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GRAPH_SET_NAME: {
      const { name } = action.payload;
      return {
        ...state,
        name,
      };
    }
    case GRAPH_CREATE: {
      const graph = action.payload;
      return {
        ...state,
        name: '',
        nodes: {},
        links: {},
        groups: {},
        text: '',
        ...graph,
        loadError: false,
      };
    }
    case GRAPH_LOAD_SUCCESS: {
      return {
        ...action.payload,
        loadError: false,
      };
    }
    case GRAPH_LOAD_ERROR: {
      return {
        ...state,
        loadError: true,
      };
    }
    case GRAPH_SET_CONTENTS: {
      const { nodes, links, groups } = action.payload;
      return {
        ...state,
        nodes: nodes.reduce((nodesMap, node) => ({ ...nodesMap, [node.id]: node }), {}),
        links: links.reduce((linksMap, link) => ({ ...linksMap, [link.id]: link }), {}),
        groups: groups.reduce((groupsMap, group) => ({ ...groupsMap, [group.id]: group }), {}),
      };
    }
    case GRAPH_SET_TEXT: {
      const text = action.payload;
      return {
        ...state,
        text,
        textError: undefined,
      };
    }
    case GRAPH_SET_TEXT_ERROR: {
      return {
        ...state,
        textError: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}
