import uuid from 'uuid/v4';

import {
  GRAPH_SET_NAME,
  GRAPH_CREATE,
  GRAPH_LOAD_SUCCESS,
  GRAPH_CREATE_NODE,
  GRAPH_CREATE_LINK,
  GRAPH_DELETE_NODE,
  GRAPH_DELETE_LINK,
  GRAPH_EDIT_NODE,
  GRAPH_EDIT_LINK,
  GRAPH_IMPORT_SUBGRAPH,
  GRAPH_GROUPS_ADD,
  GRAPH_GROUPS_UPDATE,
  GRAPH_GROUPS_REMOVE,
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
        ...graph,
      };
    }
    case GRAPH_LOAD_SUCCESS: {
      return {
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
      const linkId = uuid();
      return {
        ...state,
        links: {
          ...state.links,
          [linkId]: {
            id: linkId,
            label: `${link.source}-${link.target}`,
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
          }
          if (link.target === oldId) {
            link = {
              ...link,
              target: node.id,
            };
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
    case GRAPH_IMPORT_SUBGRAPH: {
      const { nodes, links } = action.payload;
      let { groups } = action.payload;

      // Use existing groups for groups based on name
      groups = groups.map((group) => {
        const existingGroup = Object.values(state.groups).find(({ name }) => name === group.name);
        return !!existingGroup ? existingGroup : group;
      });

      const groupsAsObject = groups.reduce(
        (obj, group) => ({
          ...obj,
          [group.id]: group,
        }),
        {}
      );
      const nodesAsObject = nodes
        .map((node) => {
          const existingNode = state.nodes[node.id] || {};
          // Use groups from the existing groups and merge them with current ones, if any
          const nodeGroups = [
            ...(existingNode.groups || []),
            ...(node.groups || []).map((group) => groups.find(({ name }) => name === group.name)),
          ].filter((item, index, groups) => groups.findIndex((candidate) => candidate.name === item.name) === index);
          return {
            ...existingNode,
            ...node,
            groups: nodeGroups,
          };
        })
        .reduce(
          (obj, node) => ({
            ...obj,
            [node.id]: node,
          }),
          {}
        );
      const linksAsObject = links
        .map((link) => {
          const existingLink = Object.values(state.links).find(({ source, target }) => source === link.source && target === link.target) || {};
          // Use groups from the existing groups and merge them with current ones, if any
          const linkGroups = [
            ...(existingLink.groups || []),
            ...(link.groups || []).map((group) => groups.find(({ name }) => name === group.name)),
          ].filter((item, index, groups) => groups.findIndex((candidate) => candidate.name === item.name) === index);
          return {
            ...existingLink,
            ...link,
            groups: linkGroups,
            id: existingLink.id || link.id,
          };
        })
        .reduce(
          (obj, link) => ({
            ...obj,
            [link.id]: link,
          }),
          {}
        );

      return {
        ...state,
        nodes: {
          ...state.nodes,
          ...nodesAsObject,
        },
        links: {
          ...state.links,
          ...linksAsObject,
        },
        groups: {
          ...state.groups,
          ...groupsAsObject,
        },
      };
    }
    case GRAPH_GROUPS_ADD: {
      const group = action.payload;
      return {
        ...state,
        groups: {
          ...state.groups,
          [group.id]: group,
        },
      };
    }
    case GRAPH_GROUPS_REMOVE: {
      const groupId = action.payload;
      const newGroups = { ...state.groups };
      delete newGroups[groupId];
      const nodes = Object.keys(state.nodes)
        .map((nodeId) => state.nodes[nodeId])
        .map((node) => ({
          ...node,
          groups: (node.groups || []).filter((ng) => ng.id !== groupId),
        }))
        .reduce(
          (nodesMap, node) => ({
            ...nodesMap,
            [node.id]: node,
          }),
          {}
        );
      const links = Object.keys(state.links)
        .map((linkId) => state.links[linkId])
        .map((link) => ({
          ...link,
          groups: (link.groups || []).filter((lg) => lg.id !== groupId),
        }))
        .reduce(
          (linksMap, link) => ({
            ...linksMap,
            [link.id]: link,
          }),
          {}
        );
      return {
        ...state,
        groups: {
          ...newGroups,
        },
        nodes,
        links,
      };
    }
    case GRAPH_GROUPS_UPDATE: {
      const group = action.payload;
      const nodes = Object.keys(state.nodes)
        .map((nodeId) => state.nodes[nodeId])
        .map((node) => {
          const groups = !!node.groups ? [...node.groups] : [];
          const groupIndex = groups.findIndex((ng) => ng.id === group.id);
          if (groupIndex >= 0) {
            groups.splice(groupIndex, 1);
            return {
              ...node,
              groups: [...groups, group],
            };
          } else {
            return node;
          }
        })
        .reduce(
          (nodesMap, node) => ({
            ...nodesMap,
            [node.id]: node,
          }),
          {}
        );
      const links = Object.keys(state.links)
        .map((linkId) => state.links[linkId])
        .map((link) => {
          const groups = !!link.groups ? [...link.groups] : [];
          const groupIndex = groups.findIndex((lg) => lg.id === group.id);
          if (groupIndex >= 0) {
            groups.splice(groupIndex, 1);
            return {
              ...link,
              groups: [...groups, group],
            };
          } else {
            return link;
          }
        })
        .reduce(
          (linksMap, link) => ({
            ...linksMap,
            [link.id]: link,
          }),
          {}
        );
      return {
        ...state,
        groups: {
          ...state.groups,
          [group.id]: group,
        },
        nodes,
        links,
      };
    }
    default: {
      return state;
    }
  }
}
