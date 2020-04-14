/* eslint-disable import/first */
jest.mock('firebase', () => ({
  __esModule: true,
  default: () => ({
    database: () => ({
      ref: () => ({
        once: () => Promise.resolve(),
      }),
    }),
  }),
}));

import firebase from 'firebase/app';

import graphNamesService, { GRAPHS_NAMES_STORAGE_KEY } from './graph-names.service';

describe('GraphNamesService', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('#getGraphNames', () => {
    let getItemSpy;
    let refSpy;
    let onceSpy;

    beforeEach(() => {
      getItemSpy = jest.spyOn(localStorage, 'getItem').mockReturnValue('{}');
      const snapshot = {
        val: () => ({
          foo: {
            name: 'camelot',
          },
          bar: {
            name: 'quest',
          },
        }),
      };
      onceSpy = jest.fn().mockResolvedValue(Promise.resolve(snapshot));
      refSpy = jest.fn().mockReturnValue({ once: onceSpy });
      jest.spyOn(firebase, 'database').mockReturnValue({
        ref: refSpy,
      });
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

    it('reads the graphs from the user path', () => {
      graphNamesService.getGraphNames('kingarthur');
      expect(refSpy).toHaveBeenCalledWith('users/kingarthur');
    });

    it('returns the keys of the snapshot value', async () => {
      const graphNames = await graphNamesService.getGraphNames('kingarthur');
      expect(graphNames).toEqual({
        foo: 'camelot',
        bar: 'quest',
      });
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
      graphNamesService.saveGraphName(undefined, id, name);
      expect(setItemSpy).toHaveBeenCalledWith(GRAPHS_NAMES_STORAGE_KEY, JSON.stringify({ ...graphNames, [id]: name }));
    });

    it('does nothing if a user ID is provided', () => {
      graphNamesService.saveGraphName('kingarthur', id, name);
      expect(setItemSpy).not.toHaveBeenCalled();
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
      graphNamesService.removeGraphName(undefined, id);
      expect(setItemSpy).toHaveBeenCalledWith(GRAPHS_NAMES_STORAGE_KEY, JSON.stringify({ bar: 'baz' }));
    });

    it('does nothing if a user ID is provided', () => {
      graphNamesService.removeGraphName('kingarthur', id);
      expect(setItemSpy).not.toHaveBeenCalled();
    });
  });
});
