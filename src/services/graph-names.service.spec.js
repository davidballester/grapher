import graphNamesService, { GRAPHS_NAMES_STORAGE_KEY } from './graph-names.service';

describe('GraphNamesService', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('#getGraphNames', () => {
    let getItemSpy;

    beforeEach(() => {
      getItemSpy = jest.spyOn(localStorage, 'getItem').mockReturnValue('{}');
    });

    it('reads the GRAPHS_NAMES_STORAGE_KEY key from the local storage', () => {
      graphNamesService.getGraphNames();
      expect(getItemSpy).toHaveBeenCalledWith(GRAPHS_NAMES_STORAGE_KEY);
    });

    it('returns an empty object if there are no value for GRAPHS_NAMES_STORAGE_KEY in the local storage', () => {
      getItemSpy.mockReturnValue(undefined);
      const graphNames = graphNamesService.getGraphNames();
      expect(graphNames).toEqual({});
    });

    it('the value found in the local storage for GRAPHS_NAMES_STORAGE_KEY as an object', () => {
      const expectedGraphNames = { foo: 'bar', baz: 'qux' };
      getItemSpy.mockReturnValue(JSON.stringify(expectedGraphNames));
      const graphNames = graphNamesService.getGraphNames();
      expect(graphNames).toEqual(expectedGraphNames);
    });
  });

  describe('#saveGraphName', () => {
    let graphNames;
    let id;
    let name;
    let setItemSpy;

    beforeEach(() => {
      graphNames = { foo: 'bar' };
      id = 'baz';
      name = 'qux';
      jest.spyOn(localStorage, 'getItem').mockReturnValue(JSON.stringify(graphNames));
      setItemSpy = jest.spyOn(localStorage, 'setItem');
    });

    it('invokes `localStorage.setItem` with the existing graph names + the provided graph name', () => {
      graphNamesService.saveGraphName(id, name);
      expect(setItemSpy).toHaveBeenCalledWith(GRAPHS_NAMES_STORAGE_KEY, JSON.stringify({ ...graphNames, [id]: name }));
    });
  });

  describe('#removeGraphName', () => {
    let graphNames;
    let id;
    let setItemSpy;

    beforeEach(() => {
      graphNames = { foo: 'bar', bar: 'baz' };
      id = 'foo';
      jest.spyOn(localStorage, 'getItem').mockReturnValue(JSON.stringify(graphNames));
      setItemSpy = jest.spyOn(localStorage, 'setItem');
    });

    it('invokes `localStorage.setItem` with the existing graph names minus the provided one', () => {
      graphNamesService.removeGraphName(id);
      expect(setItemSpy).toHaveBeenCalledWith(GRAPHS_NAMES_STORAGE_KEY, JSON.stringify({ bar: 'baz' }));
    });
  });
});
