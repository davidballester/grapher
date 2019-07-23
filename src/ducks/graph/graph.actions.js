import uuid from 'uuid/v4';

export const GRAPH_SET_NAME = 'grapher/Graph/SET_NAME';
export const GRAPH_CREATE = 'grapher/Graph/CREATE';
export const GRAPH_LOAD = 'grapher/Graph/LOAD';
export const GRAPH_LOAD_SUCCESS = 'grapher/Graph/LOAD_SUCCESS';
export const GRAPH_CREATE_NODE = 'grapher/Graph/CREATE_NODE';
export const GRAPH_CREATE_LINK = 'grapher/Graph/CREATE_LINK';
export const GRAPH_DELETE_NODE = 'grapher/Graph/DELETE_NODE';
export const GRAPH_DELETE_LINK = 'grapher/Graph/DELETE_LINK';
export const GRAPH_EDIT_NODE = 'grapher/Graph/EDIT_NODE';
export const GRAPH_DELETE = 'grapher/Graph/DELETE';
export const GRAPH_EDIT_LINK = 'grapher/Graph/EDIT_LINK';
export const GRAPH_IMPORT_SUBGRAPH = 'grapher/Graph/IMPORT_SUBGRAPH';
export const GRAPH_GROUPS_ADD = 'grapher/Graph/ADD';
export const GRAPH_GROUPS_REMOVE = 'grapher/Graph/REMOVE';
export const GRAPH_GROUPS_UPDATE = 'grapher/Graph/UPDATE';

export function setGraphName(id, name) {
  return {
    type: GRAPH_SET_NAME,
    payload: {
      id,
      name,
    },
  };
}

export function createGraph(graph) {
  return {
    type: GRAPH_CREATE,
    payload: {
      ...graph,
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

export function editLink(link) {
  return {
    type: GRAPH_EDIT_LINK,
    payload: link,
  };
}

export function importSubgraph(nodes = [], links = [], groups = []) {
  return {
    type: GRAPH_IMPORT_SUBGRAPH,
    payload: {
      nodes,
      links,
      groups,
    },
  };
}

export function addGroup(group) {
  return {
    type: GRAPH_GROUPS_ADD,
    payload: {
      id: uuid(),
      ...group,
    },
  };
}

export function removeGroup(groupId) {
  return {
    type: GRAPH_GROUPS_REMOVE,
    payload: groupId,
  };
}

export function updateGroup(group) {
  return {
    type: GRAPH_GROUPS_UPDATE,
    payload: group,
  };
}
