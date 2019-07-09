import linksService from '../../services/links.service';
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
    case GRAPH_IMPORT_SUBGRAPH: {
      const { nodes, links } = action.payload;
      const nodesAsObject = nodes.reduce(
        (obj, node) => ({
          ...obj,
          [node.id]: node,
        }),
        {}
      );
      const linksAsObject = links.reduce(
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
      return {
        ...state,
        groups: {
          ...newGroups,
        },
        nodes,
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
      return {
        ...state,
        groups: {
          ...state.groups,
          [group.id]: group,
        },
        nodes,
      };
    }
    default: {
      return state;
    }
  }
}
