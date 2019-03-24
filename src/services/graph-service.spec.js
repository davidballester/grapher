import graphService, { GRAPH_STORAGE_PREFIX } from './graph-service';

describe('graphService', () => {
  let graph;

  beforeEach(() => {
    graph = { name: 'foo', bar: 'baz' };
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('#saveGraph', () => {
    let setItemSpy;

    beforeEach(() => {
      setItemSpy = jest.spyOn(localStorage, 'setItem');
    });

    it(`saves a stringified version of the graph under \`${GRAPH_STORAGE_PREFIX}\` + graph name`, () => {
      graphService.saveGraph(graph);
      expect(setItemSpy).toHaveBeenCalledWith(`${GRAPH_STORAGE_PREFIX}${graph.name}`, JSON.stringify(graph));
    });
  });

  describe('#readGraph', () => {
    let getItemSpy;

    beforeEach(() => {
      getItemSpy = jest.spyOn(localStorage, 'getItem').mockReturnValue(JSON.stringify(graph));
    });

    it(`reads from the local storage the record under \`${GRAPH_STORAGE_PREFIX}\` + graph name`, () => {
      graphService.readGraph(graph.name);
      expect(getItemSpy).toHaveBeenCalledWith(`${GRAPH_STORAGE_PREFIX}${graph.name}`);
    });

    it(`returns the parsed value of the store record under \`${GRAPH_STORAGE_PREFIX}\` + graph name`, () => {
      const returnedGraph = graphService.readGraph(graph.name);
      expect(returnedGraph).toEqual(graph);
    });
  });

  describe('#removeGraph', () => {
    let removeItemSpy;

    beforeEach(() => {
      removeItemSpy = jest.spyOn(localStorage, 'removeItem');
    });

    it(`removes from the local storage the record under \`${GRAPH_STORAGE_PREFIX}\` + graph name`, () => {
      graphService.removeGraph(graph.name);
      expect(removeItemSpy).toHaveBeenCalledWith(`${GRAPH_STORAGE_PREFIX}${graph.name}`);
    });
  });
});