import { graphNamesService, GRAPHS_NAMES_STORAGE_KEY } from './graph-names-service';

describe('GraphNamesService', () => {
  describe('#getGraphNames', () => {
    let getItemSpy;

    beforeEach(() => {
      getItemSpy = jest.spyOn(localStorage, 'getItem').mockReturnValue('[]');
    });

    afterEach(() => {
      jest.resetAllMocks();
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
});
