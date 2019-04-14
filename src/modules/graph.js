import { createSelector } from 'reselect';
import { select, takeLatest, call, put } from 'redux-saga/effects';

import linksService from '../services/links-service';
import graphService from '../services/graph-service';
import graphNamesService from '../services/graph-names-service';

export const GRAPH_SET_NAME = 'grapher/Graph/SET_NAME';
export const GRAPH_CREATE = 'grapher/Graph/CREATE';
export const GRAPH_LOAD = 'grapher/Graph/LOAD';
export const GRAPH_LOAD_SUCCESS = 'grapher/Graph/LOAD_SUCCESS';
export const GRAPH_CREATE_NODE = 'grapher/Graph/CREATE_NODE';
export const GRAPH_CREATE_LINK = 'grapher/Graph/CREATE_LINK';
export const GRAPH_DELETE_NODE = 'grapher/Graph/DELETE_NODE';
export const GRAPH_DELETE_LINK = 'grapher/Graph/DELETE_LINK';
export const GRAPH_EDIT_NODE = 'grapher/Graph/EDIT_NODE';

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
    'kingarthur-sirmordred': {
      id: 'kingarthur-sirmordred',
      source: 'kingarthur',
      target: 'sirmordred',
    },
    'kingarthur-ladyguinevere': {
      id: 'kingarthur-ladyguinevere',
      source: 'kingarthur',
      target: 'ladyguinevere',
    },
    'kingarthur-merlin': {
      id: 'kingarthur-merlin',
      source: 'kingarthur',
      target: 'merlin',
    },
    'kingarthur-sirlancelot': {
      id: 'kingarthur-sirlancelot',
      source: 'kingarthur',
      target: 'sirlancelot',
    },
    'sirlancelot-sirgalahad': {
      id: 'sirlancelot-sirgalahad',
      source: 'sirlancelot',
      target: 'sirgalahad',
    },
    'sirlancelot-ladyguinevere': {
      id: 'sirlancelot-ladyguinevere',
      source: 'sirlancelot',
      target: 'ladyguinevere',
    },
    'sirlancelot-sirbors': {
      id: 'sirlancelot-sirbors',
      source: 'sirlancelot',
      target: 'sirbors',
    },
    'sirgalahad-sirlamorak': {
      id: 'sirgalahad-sirlamorak',
      source: 'sirgalahad',
      target: 'sirlamorak',
    },
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
    case GRAPH_LOAD_SUCCESS: {
      return {
        ...state,
        ...action.payload,
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
    case GRAPH_DELETE_NODE: {
      const nodeId = action.payload;
      const links = Object.keys(state.links)
        .filter((linkId) => state.links[linkId].source !== nodeId && state.links[linkId].target !== nodeId)
        .reduce((newLinks, linkId) => ({ ...newLinks, [linkId]: state.links[linkId] }), {});
      const nodes = { ...state.nodes };
      delete nodes[nodeId];
      return {
        ...state,
        nodes,
        links,
      };
    }
    case GRAPH_CREATE_LINK: {
      const link = action.payload;
      const linkId = linksService.getId(link);
      return {
        ...state,
        links: {
          ...state.links,
          [linkId]: {
            id: linkId,
            ...link,
          },
        },
      };
    }
    case GRAPH_DELETE_LINK: {
      const linkId = action.payload;
      const links = { ...state.links };
      delete links[linkId];
      return {
        ...state,
        links,
      };
    }
    case GRAPH_EDIT_NODE: {
      const { oldId, node } = action.payload;
      let nodes = { ...state.nodes };
      delete nodes[oldId];
      const links = Object.keys(state.links)
        .map((linkId) => {
          let link = state.links[linkId];
          if (link.source === oldId) {
            link = {
              ...link,
              source: node.id,
            };
            link.id = linksService.getId(link);
          }
          if (link.target === oldId) {
            link = {
              ...link,
              target: node.id,
            };
            link.id = linksService.getId(link);
          }
          return link;
        })
        .reduce((newLinks, link) => ({ ...newLinks, [link.id]: link }), {});
      return {
        ...state,
        nodes: { ...nodes, [node.id]: node },
        links,
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

export function loadGraph(graphName) {
  return {
    type: GRAPH_LOAD,
    payload: graphName,
  };
}

export function loadGraphSuccess(graph) {
  return {
    type: GRAPH_LOAD_SUCCESS,
    payload: graph,
  };
}

export function createNode(node) {
  return {
    type: GRAPH_CREATE_NODE,
    payload: node,
  };
}

export function createLink(link) {
  return {
    type: GRAPH_CREATE_LINK,
    payload: link,
  };
}

export function deleteNode(nodeId) {
  return {
    type: GRAPH_DELETE_NODE,
    payload: nodeId,
  };
}

export function deleteLink(linkId) {
  return {
    type: GRAPH_DELETE_LINK,
    payload: linkId,
  };
}

export function editNode(oldId, node) {
  return {
    type: GRAPH_EDIT_NODE,
    payload: {
      oldId,
      node,
    },
  };
}

export function graphSelector(state) {
  return state.graph;
}

export function getName(state) {
  return graphSelector(state).name;
}

function getNodes(state) {
  return graphSelector(state).nodes;
}

export function getLinks(state) {
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

export const getNodesIds = createSelector(
  getNodes,
  (nodes) => Object.keys(nodes)
);

export function* saveGraph(action) {
  const graph = yield select(graphSelector);
  const updatedGraph = yield call(reducer, graph, action);
  yield call([graphService, 'removeGraph'], graph.name);
  yield call([graphService, 'saveGraph'], updatedGraph);
  yield call([graphNamesService, 'removeGraphName'], graph.name);
  yield call([graphNamesService, 'saveGraphName'], updatedGraph.name);
}

export function* saveGraphSaga() {
  yield takeLatest([GRAPH_CREATE, GRAPH_SET_NAME, GRAPH_CREATE_NODE, GRAPH_CREATE_LINK, GRAPH_DELETE_NODE, GRAPH_DELETE_LINK], saveGraph);
}

export function* doLoadGraph(action) {
  const graphName = action.payload;
  const graph = yield call([graphService, 'readGraph'], graphName);
  yield put(loadGraphSuccess(graph));
}

export function* loadGraphSaga() {
  yield takeLatest([GRAPH_LOAD], doLoadGraph);
}
