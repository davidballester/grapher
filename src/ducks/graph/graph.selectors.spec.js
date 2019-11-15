/* eslint-disable import/first */
jest.mock('../../services/graph.service', () => ({
  __esModule: true,
  default: {
    serializeGraph: jest.fn(),
  },
}));

import graphService from '../../services/graph.service';
import {
  getName,
  getNodesAsArray,
  getLinksAsArray,
  getNodesIds,
  getId,
  getLinkById,
  getLinksWithOpposite,
  getLinksIdsWithOpposite,
  getSerializedGraph,
  getGroupsAsArray,
  getText,
  getTextError,
} from './graph.selectors';

describe('selectors', () => {
  describe('getName', () => {
    it('extracts `name` from the graph substate', () => {
      const expectedName = 'foo';
      const appState = {
        graph: {
          name: expectedName,
        },
      };
      const name = getName(appState);
      expect(name).toEqual(expectedName);
    });
  });

  describe(getId.name, () => {
    it('extracts `id` from the graph substate', () => {
      const expectedId = 'foo';
      const appState = {
        graph: {
          id: expectedId,
        },
      };
      const id = getId(appState);
      expect(id).toEqual(expectedId);
    });
  });

  describe('getNodesAsArray', () => {
    it('returns an empty array if there are no nodes', () => {
      const appState = {
        graph: {
          nodes: {},
        },
      };
      const nodes = getNodesAsArray(appState);
      expect(nodes).toEqual([]);
    });

    it('returns an array with all the nodes in the state', () => {
      const node1 = { bar: 'baz' };
      const node2 = { baz: 'qux' };
      const node3 = { qux: 'quux' };
      const appState = {
        graph: {
          nodes: {
            foo: node1,
            bar: node2,
            baz: node3,
          },
        },
      };
      const nodes = getNodesAsArray(appState);
      expect(nodes).toEqual([node1, node2, node3]);
    });

    it('returns an empty array if the state contains no nodes', () => {
      const nodes = getNodesAsArray({ graph: {} });
      expect(nodes).toEqual([]);
    });
  });

  describe('getLinksAsArray', () => {
    it('returns an empty array if there are no links', () => {
      const appState = {
        graph: {
          links: {},
        },
      };
      const links = getLinksAsArray(appState);
      expect(links).toEqual([]);
    });

    it('returns an array with all the links in the state', () => {
      const link1 = { bar: 'baz' };
      const link2 = { baz: 'qux' };
      const link3 = { qux: 'quux' };
      const appState = {
        graph: {
          links: {
            foo: link1,
            bar: link2,
            baz: link3,
          },
        },
      };
      const links = getLinksAsArray(appState);
      expect(links).toEqual([link1, link2, link3]);
    });

    it('returns an empty array if the state contains no links', () => {
      const links = getLinksAsArray({ graph: {} });
      expect(links).toEqual([]);
    });
  });

  describe(getNodesIds.name, () => {
    it('returns an empty array if there are no nodes', () => {
      const appState = {
        graph: {
          nodes: {},
        },
      };
      const nodesIds = getNodesIds(appState);
      expect(nodesIds).toEqual([]);
    });

    it('returns the IDs of the nodes', () => {
      const appState = {
        graph: {
          nodes: {
            foo: {},
            bar: {},
          },
        },
      };
      const nodesIds = getNodesIds(appState);
      expect(nodesIds).toEqual(['foo', 'bar']);
    });
  });

  describe(getLinkById.name, () => {
    const linkId = 'foo';

    it('returns the link which ID is provided', () => {
      const expectedLink = { foo: 'bar' };
      const state = {
        graph: {
          links: {
            [linkId]: expectedLink,
          },
        },
      };
      const link = getLinkById(state, linkId);
      expect(link).toEqual(expectedLink);
    });

    it('returns nothing if there is no link matching the given ID', () => {
      const state = {
        graph: {
          links: {},
        },
      };
      const link = getLinkById(state, linkId);
      expect(link).toBeUndefined();
    });
  });

  describe(getLinksWithOpposite.name, () => {
    it('returns an empty array if there are no links', () => {
      const state = { graph: { links: {} } };
      const links = getLinksWithOpposite(state);
      expect(links).toEqual([]);
    });

    it('returns an empty array if there are no links with opposite', () => {
      const state = {
        graph: {
          links: {
            'foo-bar': {
              source: 'foo',
              target: 'bar',
            },
            'foo-baz': {
              source: 'foo',
              target: 'baz',
            },
          },
        },
      };
      const links = getLinksWithOpposite(state);
      expect(links).toEqual([]);
    });

    it('returns links with opposites', () => {
      const fooBar = {
        source: 'foo',
        target: 'bar',
      };
      const barFoo = {
        source: 'bar',
        target: 'foo',
      };
      const state = {
        graph: {
          links: {
            'foo-bar': fooBar,
            'foo-baz': {
              source: 'foo',
              target: 'baz',
            },
            'bar-foo': barFoo,
          },
        },
      };
      const links = getLinksWithOpposite(state);
      expect(links).toEqual([fooBar, barFoo]);
    });
  });

  describe(getLinksIdsWithOpposite.name, () => {
    it('returns the IDs of the links with opposite', () => {
      const fooBar = {
        id: 'foo-bar',
        source: 'foo',
        target: 'bar',
      };
      const barFoo = {
        id: 'bar-foo',
        source: 'bar',
        target: 'foo',
      };
      const state = {
        graph: {
          links: {
            'foo-bar': fooBar,
            'foo-baz': {
              id: 'foo-baz',
              source: 'foo',
              target: 'baz',
            },
            'bar-foo': barFoo,
          },
        },
      };
      const links = getLinksIdsWithOpposite(state);
      expect(links).toEqual([fooBar.id, barFoo.id]);
    });
  });

  describe(getSerializedGraph.name, () => {
    it('invokes the serialize method of the graph service', () => {
      const graph = { foo: 'bar' };
      const state = { graph };
      getSerializedGraph(state);
      expect(graphService.serializeGraph).toHaveBeenCalledWith(graph);
    });

    it('returns the result of the serialization', () => {
      const graph = { foo: 'bar' };
      const state = { graph };
      const expectedResult = 'foo';
      graphService.serializeGraph.mockReturnValue(expectedResult);
      const result = getSerializedGraph(state);
      expect(result).toEqual(expectedResult);
    });
  });

  describe(getGroupsAsArray.name, () => {
    it('returns an empty array if there are no groups in the state', () => {
      const groups = getGroupsAsArray({ graph: { groups: {} } });
      expect(groups).toEqual([]);
    });

    it('returns the groups in the state as an array', () => {
      const state = {
        graph: {
          groups: {
            foo: {
              bar: 'baz',
            },
            bar: {
              baz: 'qux',
            },
          },
        },
      };
      const groups = getGroupsAsArray(state);
      expect(groups).toEqual([{ bar: 'baz' }, { baz: 'qux' }]);
    });
  });

  describe(getText.name, () => {
    it('extracts `text` from the graph substate', () => {
      const appState = {
        graph: {
          text: 'foo',
        },
      };
      const text = getText(appState);
      expect(text).toEqual('foo');
    });
  });

  describe(getTextError.name, () => {
    it('extracts textError from the graph substate', () => {
      const appState = {
        graph: {
          textError: true,
        },
      };
      const textError = getTextError(appState);
      expect(textError).toEqual(true);
    });
  });
});
