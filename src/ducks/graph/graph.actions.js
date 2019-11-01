import uuid from 'uuid/v4';

export const GRAPH_SET_NAME = 'grapher/Graph/SET_NAME';
export const GRAPH_CREATE = 'grapher/Graph/CREATE';
export const GRAPH_LOAD = 'grapher/Graph/LOAD';
export const GRAPH_LOAD_SUCCESS = 'grapher/Graph/LOAD_SUCCESS';
export const GRAPH_DELETE = 'grapher/Graph/DELETE';
export const GRAPH_SET_CONTENTS = 'grapher/Graph/SET_CONTENTS';
export const GRAPH_SET_TEXT = 'grapher/Graph/SET_TEXT';
export const GRAPH_SET_TEXT_ERROR = 'grapher/Graph/SET_TEXT_ERROR';

export function setGraphName(id, name) {
  return {
    type: GRAPH_SET_NAME,
    payload: {
      id,
      name,
    },
  };
}

export function createGraph(graph, includeSampleGraph) {
  return {
    type: GRAPH_CREATE,
    payload: {
      ...graph,
      includeSampleGraph,
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

export function deleteGraph(id) {
  return {
    type: GRAPH_DELETE,
    payload: id,
  };
}

export function setContents(nodes = [], links = [], groups = []) {
  return {
    type: GRAPH_SET_CONTENTS,
    payload: {
      nodes,
      links,
      groups,
    },
  };
}

export function setText(text) {
  return {
    type: GRAPH_SET_TEXT,
    payload: text,
  };
}

export function setTextError(error) {
  return {
    type: GRAPH_SET_TEXT_ERROR,
    payload: error,
  };
}
