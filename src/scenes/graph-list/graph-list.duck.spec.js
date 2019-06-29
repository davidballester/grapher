import { getGraphNames } from './graph-list.duck';

describe('graph-list', () => {
  describe('selectors', () => {
    describe(getGraphNames.name, () => {
      it('extracts `graphNames` from the graphs list substate', () => {
        const expectedGraphNames = ['foo', 'bar', 'baz'];
        const appState = {
          graphList: [...expectedGraphNames],
        };
        const graphNames = getGraphNames(appState);
        expect(graphNames).toEqual(expectedGraphNames);
      });
    });
  });
});
