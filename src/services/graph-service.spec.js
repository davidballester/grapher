/* eslint-disable import/first */
jest.mock('jsonschema', () => ({
  validate: jest.fn(),
}));

import { validate } from 'jsonschema';

import graphService, { GRAPH_STORAGE_PREFIX } from './graph-service';

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

    beforeEach(() => {
      setItemSpy = jest.spyOn(localStorage, 'setItem');
    });

    it(`saves a stringified version of the graph under \`${GRAPH_STORAGE_PREFIX}\` + graph id`, () => {
      graphService.saveGraph(graph);
      expect(setItemSpy).toHaveBeenCalledWith(`${GRAPH_STORAGE_PREFIX}${graph.id}`, JSON.stringify(graph));
    });
  });

  describe('#readGraph', () => {
    let getItemSpy;

    beforeEach(() => {
      getItemSpy = jest.spyOn(localStorage, 'getItem').mockReturnValue(JSON.stringify(graph));
    });

    it(`reads from the local storage the record under \`${GRAPH_STORAGE_PREFIX}\` + graph id`, () => {
      graphService.readGraph(graph.id);
      expect(getItemSpy).toHaveBeenCalledWith(`${GRAPH_STORAGE_PREFIX}${graph.id}`);
    });

    it(`returns the parsed value of the store record under \`${GRAPH_STORAGE_PREFIX}\` + graph id`, () => {
      const returnedGraph = graphService.readGraph(graph.id);
      expect(returnedGraph).toEqual(graph);
    });
  });

  describe('#removeGraph', () => {
    let removeItemSpy;

    beforeEach(() => {
      removeItemSpy = jest.spyOn(localStorage, 'removeItem');
    });

    it(`removes from the local storage the record under \`${GRAPH_STORAGE_PREFIX}\` + graph id`, () => {
      graphService.removeGraph(graph.id);
      expect(removeItemSpy).toHaveBeenCalledWith(`${GRAPH_STORAGE_PREFIX}${graph.id}`);
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
