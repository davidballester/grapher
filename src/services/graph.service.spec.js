/* eslint-disable import/first */
jest.mock('jsonschema', () => ({
  validate: jest.fn(),
}));

jest.mock('firebase', () => ({
  __esModule: true,
  default: () => ({
    database: () => ({
      ref: () => ({
        once: () => Promise.resolve(),
        set: () => Promise.resolve(),
        remove: () => Promise.resolve(),
      }),
    }),
  }),
}));

import { validate } from 'jsonschema';
import firebase from 'firebase/app';

import graphService, { GRAPH_STORAGE_PREFIX } from './graph.service';

describe('graphService', () => {
  let graph;

  beforeEach(() => {
    graph = { id: 'foo', bar: 'baz' };
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('#saveGraph', () => {
    let setItemSpy;
    let refSpy;
    let setSpy;

    beforeEach(() => {
      setItemSpy = jest.spyOn(localStorage, 'setItem');
      setSpy = jest.fn().mockResolvedValue(Promise.resolve());
      refSpy = jest.fn().mockReturnValue({ set: setSpy });
      jest.spyOn(firebase, 'database').mockReturnValue({
        ref: refSpy,
      });
    });

    it(`saves a stringified version of the graph under \`${GRAPH_STORAGE_PREFIX}\` + graph id`, () => {
      graphService.saveGraph(undefined, graph);
      expect(setItemSpy).toHaveBeenCalledWith(`${GRAPH_STORAGE_PREFIX}${graph.id}`, JSON.stringify(graph));
    });

    it('stores the graph into the user path', () => {
      graphService.saveGraph('kingarthur', graph);
      expect(refSpy).toHaveBeenCalledWith('users/kingarthur/foo');
    });

    it('stores a version of the graph without undefines', () => {
      graph = {
        ...graph,
        foo: undefined,
        baz: [
          {
            qux: undefined,
          },
        ],
        qux: {
          quux: undefined,
        },
      };
      graphService.saveGraph('kingarthur', graph);
      expect(setSpy).toHaveBeenCalledWith({
        ...graph,
        baz: [{}],
        qux: {},
      });
    });
  });

  describe('#readGraph', () => {
    let getItemSpy;
    let refSpy;
    let onceSpy;

    beforeEach(() => {
      getItemSpy = jest.spyOn(localStorage, 'getItem').mockReturnValue(JSON.stringify(graph));
      const snapshot = {
        val: () => graph,
      };
      onceSpy = jest.fn().mockResolvedValue(Promise.resolve(snapshot));
      refSpy = jest.fn().mockReturnValue({ once: onceSpy });
      jest.spyOn(firebase, 'database').mockReturnValue({
        ref: refSpy,
      });
    });

    it(`reads from the local storage the record under \`${GRAPH_STORAGE_PREFIX}\` + graph id`, () => {
      graphService.readGraph(undefined, graph.id);
      expect(getItemSpy).toHaveBeenCalledWith(`${GRAPH_STORAGE_PREFIX}${graph.id}`);
    });

    it(`returns the parsed value of the store record under \`${GRAPH_STORAGE_PREFIX}\` + graph id`, () => {
      const returnedGraph = graphService.readGraph(undefined, graph.id);
      expect(returnedGraph).toEqual(graph);
    });

    it('reads the graph from the user path', () => {
      graphService.readGraph('kingarthur', graph.id);
      expect(refSpy).toHaveBeenCalledWith('users/kingarthur/foo');
    });

    it('returns the snapshot value', async () => {
      const returnedGraph = await graphService.readGraph('kingarthur', graph.id);
      expect(returnedGraph).toEqual(graph);
    });
  });

  describe('#removeGraph', () => {
    let removeItemSpy;
    let removeSpy;
    let refSpy;

    beforeEach(() => {
      removeItemSpy = jest.spyOn(localStorage, 'removeItem');
      removeSpy = jest.fn().mockResolvedValue(Promise.resolve());
      refSpy = jest.fn().mockReturnValue({ remove: removeSpy });
      jest.spyOn(firebase, 'database').mockReturnValue({
        ref: refSpy,
      });
    });

    it(`removes from the local storage the record under \`${GRAPH_STORAGE_PREFIX}\` + graph id`, () => {
      graphService.removeGraph(undefined, graph.id);
      expect(removeItemSpy).toHaveBeenCalledWith(`${GRAPH_STORAGE_PREFIX}${graph.id}`);
    });

    it('removes the graph from the user path', () => {
      graphService.removeGraph('kingarthur', graph.id);
      expect(refSpy).toHaveBeenCalledWith('users/kingarthur/foo');
    });

    it('removes the graph from firebase', () => {
      graphService.removeGraph('kingarthur', graph.id);
      expect(removeSpy).toHaveBeenCalled();
    });
  });

  describe('#serializeGraph', () => {
    it('stringifies the given graph', () => {
      const graph = { foo: 'bar' };
      const expectedGraph = JSON.stringify(graph, null, 2);
      const receivedGraph = graphService.serializeGraph(graph);
      expect(receivedGraph).toEqual(expectedGraph);
    });
  });

  describe('#deserializeGraph', () => {
    let expectedGraph;
    let input;

    beforeEach(() => {
      expectedGraph = {
        id: 'foo',
        name: 'bar',
        nodes: {},
        links: {},
      };
      input = JSON.stringify(expectedGraph);

      validate.mockReturnValue({ valid: true });
    });

    it('throws an error containing an error message if the input is not a valid JSON', () => {
      const { errors } = graphService.deserializeGraph('');
      expect(errors.length).toEqual(1);
    });

    it('validates the parsed input', () => {
      graphService.deserializeGraph(input);
      expect(validate).toHaveBeenCalledWith(expectedGraph, expect.anything());
    });

    it('returns errors if the validation fails', () => {
      validate.mockReturnValue({
        valid: false,
        errors: [],
      });
      const { errors } = graphService.deserializeGraph(input);
      expect(errors).toBeDefined();
    });

    it('returns the stack of the validation errors subtituting instance by Graph', () => {
      validate.mockReturnValue({
        valid: false,
        errors: [
          {
            stack: 'instance foo',
          },
        ],
      });
      const { errors } = graphService.deserializeGraph(input);
      expect(errors[0]).toEqual('Graph foo');
    });

    it('returns the deserialized input', () => {
      const { graph } = graphService.deserializeGraph(input);
      expect(graph).toEqual(expectedGraph);
    });
  });
});
