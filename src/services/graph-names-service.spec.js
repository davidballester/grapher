import graphNamesService, { GRAPHS_NAMES_STORAGE_KEY } from './graph-names-service';

describe('GraphNamesService', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('#getGraphNames', () => {
    let getItemSpy;

    beforeEach(() => {
      getItemSpy = jest.spyOn(localStorage, 'getItem').mockReturnValue('[]');
    });

    it('reads the GRAPHS_NAMES_STORAGE_KEY key from the local storage', () => {
      graphNamesService.getGraphNames();
      expect(getItemSpy).toHaveBeenCalledWith(GRAPHS_NAMES_STORAGE_KEY);
    });

    it('returns an empty array if there are no value for GRAPHS_NAMES_STORAGE_KEY in the local storage', () => {
      getItemSpy.mockReturnValue(undefined);
      const graphNames = graphNamesService.getGraphNames();
      expect(graphNames).toEqual([]);
    });

    it('the value found in the local storage for GRAPHS_NAMES_STORAGE_KEY as an array of strings', () => {
      const expectedGraphNames = ['foo', 'bar', 'baz'];
      getItemSpy.mockReturnValue(JSON.stringify(expectedGraphNames));
      const graphNames = graphNamesService.getGraphNames();
      expect(graphNames).toEqual(expectedGraphNames);
    });
  });

  describe('#saveGraphName', () => {
    let graphNames;
    let graphName;
    let setItemSpy;

    beforeEach(() => {
      graphNames = ['foo'];
      graphName = 'bar';
      jest.spyOn(localStorage, 'getItem').mockReturnValue(JSON.stringify(graphNames));
      setItemSpy = jest.spyOn(localStorage, 'setItem');
    });

    it('invokes `localStorage.setItem` with the existing array of graph names + the provided graph name', () => {
      graphNamesService.saveGraphName(graphName);
      expect(setItemSpy).toHaveBeenCalledWith(GRAPHS_NAMES_STORAGE_KEY, JSON.stringify([...graphNames, graphName]));
    });

    it('adds a graph name even if it was already in the list', () => {
      graphNamesService.saveGraphName(graphNames[0]);
      expect(setItemSpy).toHaveBeenCalledWith(GRAPHS_NAMES_STORAGE_KEY, JSON.stringify([...graphNames, graphNames[0]]));
    });
  });

  describe('#removeGraphName', () => {
    let graphNames;
    let graphName;
    let setItemSpy;

    beforeEach(() => {
      graphNames = ['foo'];
      graphName = 'foo';
      jest.spyOn(localStorage, 'getItem').mockReturnValue(JSON.stringify(graphNames));
      setItemSpy = jest.spyOn(localStorage, 'setItem');
    });

    it('invokes `localStorage.setItem` with the existing array of graph names - the provided graph name', () => {
      graphNamesService.removeGraphName(graphName);
      expect(setItemSpy).toHaveBeenCalledWith(GRAPHS_NAMES_STORAGE_KEY, JSON.stringify([]));
    });

    it('removes just one instance of the provided name', () => {
      jest.spyOn(localStorage, 'getItem').mockReturnValue(JSON.stringify([...graphNames, ...graphNames]));
      graphNamesService.removeGraphName(graphName);
      expect(setItemSpy).toHaveBeenCalledWith(GRAPHS_NAMES_STORAGE_KEY, JSON.stringify(graphNames));
    });

    it('does not save the array if the provided name is not contained', () => {
      graphNamesService.removeGraphName('bar');
      expect(setItemSpy).not.toHaveBeenCalled();
    });
  });
});
