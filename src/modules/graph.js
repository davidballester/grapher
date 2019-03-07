import { createSelector } from 'reselect';

export const GRAPH_SET_NAME = 'grapher/Graph/SET_NAME';
export const GRAPH_CREATE = 'grapher/Graph/CREATE';
export const GRAPH_CREATE_NODE = 'grapher/Graph/CREATE_NODE';

const initialState = {
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
    'kingarthur-sirmordred': { source: 'kingarthur', target: 'sirmordred' },
    'kingarthur-ladyguinevere': { source: 'kingarthur', target: 'ladyguinevere' },
    'kingarthur-merlin': { source: 'kingarthur', target: 'merlin' },
    'kingarthur-sirlancelot': { source: 'kingarthur', target: 'sirlancelot' },
    'sirlancelot-sirgalahad': { source: 'sirlancelot', target: 'sirgalahad' },
    'sirlancelot-ladyguinevere': { source: 'sirlancelot', target: 'ladyguinevere' },
    'sirlancelot-sirbors': { source: 'sirlancelot', target: 'sirbors' },
    'sirgalahad-sirlamorak': { source: 'sirgalahad', target: 'sirlamorak' },
  },
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GRAPH_SET_NAME: {
      return {
        ...state,
        name: action.payload,
      };
    }
    case GRAPH_CREATE: {
      return {
        ...state,
        name: action.payload,
        nodes: {},
        links: {},
      };
    }
    case GRAPH_CREATE_NODE: {
      const node = action.payload;
      return {
        ...state,
        nodes: {
          ...state.nodes,
          [node.id]: node,
        },
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

export function createGraph(graphName) {
  return {
    type: GRAPH_CREATE,
    payload: graphName,
  };
}

export function createNode(node) {
  return {
    type: GRAPH_CREATE_NODE,
    payload: node,
  };
}

function graphSelector(state) {
  return state.graph;
}

export function getName(state) {
  return graphSelector(state).name;
}

function getNodes(state) {
  return graphSelector(state).nodes;
}

function getLinks(state) {
  return graphSelector(state).links;
}

export const getNodesAsArray = createSelector(
  getNodes,
  (nodes) => Object.values(nodes)
);

export const getLinksAsArray = createSelector(
  getLinks,
  (links) => Object.values(links)
);
