import { GRAPH_SET_NAME, GRAPH_CREATE, GRAPH_LOAD_SUCCESS, GRAPH_IMPORT_SUBGRAPH, GRAPH_SET_TEXT } from './graph.actions';

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
        ...graph,
      };
    }
    case GRAPH_LOAD_SUCCESS: {
      return {
        ...action.payload,
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
    case GRAPH_SET_TEXT: {
      const text = action.payload;
      return {
        ...state,
        text,
      };
    }
    default: {
      return state;
    }
  }
}
