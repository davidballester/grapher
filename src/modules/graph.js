import { createSelector } from 'reselect';
import { select, takeLatest, call, put } from 'redux-saga/effects';
import uuid from 'uuid/v4';
import blue from '@material-ui/core/colors/blue';

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
export const GRAPH_OPEN = 'grapher/Graph/OPEN';
export const GRAPH_DELETE = 'grapher/Graph/DELETE';
export const GRAPH_EDIT_LINK = 'grapher/Graph/EDIT_LINK';

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
      const { name, id } = action.payload;
      return {
        ...state,
        id,
        name,
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
            label: linkId,
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
    case GRAPH_EDIT_LINK: {
      const link = action.payload;
      return {
        ...state,
        links: {
          ...state.links,
          [link.id]: link,
        },
      };
    }
    default: {
      return state;
    }
  }
}

export function setGraphName(id, name) {
  return {
    type: GRAPH_SET_NAME,
    payload: {
      id,
      name,
    },
  };
}

export function createGraph(name) {
  return {
    type: GRAPH_CREATE,
    payload: {
      name,
      id: uuid(),
    },
  };
}

export function loadGraph(id) {
  return {
    type: GRAPH_LOAD,
    payload: id,
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
    payload: {
      color: blue['A200'],
      ...node,
    },
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

export function deleteGraph(id) {
  return {
    type: GRAPH_DELETE,
    payload: id,
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

export function openGraph(id) {
  return {
    type: GRAPH_OPEN,
    payload: id,
  };
}

export function editLink(link) {
  return {
    type: GRAPH_EDIT_LINK,
    payload: link,
  };
}

export function graphSelector(state) {
  return state.graph;
}

export function getId(state) {
  return graphSelector(state).id;
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

export function getLinkById(state, linkId) {
  return getLinks(state)[linkId];
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

/**
 * Gets a list of links that have an opposite link, that is, where there's another link which source is this one target and vice versa.
 */
export const getLinksWithOpposite = createSelector(
  getLinksAsArray,
  (links) => links.filter((link) => !!getOppositeLink(links, link))
);

/**
 * Gets the IDs of links that have an opposite link, that is, where there's another link which source is this one target and vice versa.
 */
export const getLinksIdsWithOpposite = createSelector(
  getLinksWithOpposite,
  (links) => links.map((link) => link.id)
);

export const getSerializedGraph = createSelector(
  graphSelector,
  (graph) => graphService.serializeGraph(graph)
);

export function* saveGraph() {
  const graph = yield select(graphSelector);
  yield call([graphService, 'saveGraph'], graph);
  yield call([graphNamesService, 'saveGraphName'], graph.id, graph.name);
}

export function* saveGraphSaga() {
  yield takeLatest(
    [GRAPH_CREATE, GRAPH_SET_NAME, GRAPH_CREATE_NODE, GRAPH_CREATE_LINK, GRAPH_DELETE_NODE, GRAPH_DELETE_LINK, GRAPH_EDIT_NODE, GRAPH_EDIT_LINK],
    saveGraph
  );
}

export function* doLoadGraph(action) {
  const graphId = action.payload;
  const graph = yield call([graphService, 'readGraph'], graphId);
  yield put(loadGraphSuccess(graph));
}

export function* loadGraphSaga() {
  yield takeLatest([GRAPH_LOAD], doLoadGraph);
}

export function* doDeleteGraph({ payload: graphId }) {
  yield call([graphService, 'removeGraph'], graphId);
  yield call([graphNamesService, 'removeGraphName'], graphId);
}

export function* deleteGraphSaga() {
  yield takeLatest([GRAPH_DELETE], doDeleteGraph);
}

function getOppositeLink(links, { source, target }) {
  return links.find(({ source: candidateSource, target: candidateTarget }) => candidateSource === target && candidateTarget === source);
}
