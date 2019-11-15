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
  id: '',
  name: '',
  nodes: {
    kingarthur: { id: 'kingarthur' },
    sirgalahad: { id: 'sirgalahad' },
    sirlancelot: { id: 'sirlancelot' },
    sirlamorak: { id: 'sirlamorak' },
    sirbors: { id: 'sirbors' },
    ladyguinevere: { id: 'ladyguinevere' },
    merlin: { id: 'merlin' },
    sirmordred: { id: 'sirmordred' },
  },
  links: {
    'kingarthur-sirmordred': {
      id: 'kingarthur-sirmordred',
      label: 'fathers',
      source: 'kingarthur',
      target: 'sirmordred',
    },
    'kingarthur-ladyguinevere': {
      id: 'kingarthur-ladyguinevere',
      label: 'married to',
      source: 'kingarthur',
      target: 'ladyguinevere',
    },
    'kingarthur-merlin': {
      id: 'kingarthur-merlin',
      label: 'mentored by',
      source: 'kingarthur',
      target: 'merlin',
    },
    'sirlancelot-kingarthur': {
      id: 'sirlancelot-kingarthur',
      label: 'serves',
      source: 'sirlancelot',
      target: 'kingarthur',
    },
    'sirlancelot-sirgalahad': {
      id: 'sirlancelot-sirgalahad',
      label: 'fathers',
      source: 'sirlancelot',
      target: 'sirgalahad',
    },
    'sirlancelot-ladyguinevere': {
      id: 'sirlancelot-ladyguinevere',
      label: 'in a relationship with',
      source: 'sirlancelot',
      target: 'ladyguinevere',
    },
    'sirlancelot-sirbors': {
      id: 'sirlancelot-sirbors',
      label: 'cousin of',
      source: 'sirlancelot',
      target: 'sirbors',
    },
    'sirgalahad-sirlamorak': {
      id: 'sirgalahad-sirlamorak',
      label: 'friend of',
      source: 'sirgalahad',
      target: 'sirlamorak',
    },
  },
  groups: {},
  text: '',
  textError: undefined,
  loadError: false,
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
