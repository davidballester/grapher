import { createSelector } from 'reselect';

import graphService from '../../services/graph.service';

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

const getGroups = createSelector(
  graphSelector,
  (graph) => graph.groups
);

export const getGroupsAsArray = createSelector(
  getGroups,
  (groups) => Object.keys(groups).map((groupId) => groups[groupId])
);

function getOppositeLink(links, { source, target }) {
  return links.find(({ source: candidateSource, target: candidateTarget }) => candidateSource === target && candidateTarget === source);
}

export function getText(state) {
  return graphSelector(state).text;
}
