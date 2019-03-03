import { getGraphNames } from './graph-names';

describe('graph-names', () => {
  describe('selectors', () => {
    describe('getGraphNames', () => {
      it('extracts `graphNames` from the graphs list substate', () => {
        const expectedGraphNames = ['foo', 'bar', 'baz'];
        const appState = {
          graphNames: [...expectedGraphNames],
        };
        const graphNames = getGraphNames(appState);
        expect(graphNames).toEqual(expectedGraphNames);
      });
    });
  });
});
