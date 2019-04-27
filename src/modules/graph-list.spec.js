import { GRAPH_LIST_OPEN, openGraphList, getGraphNames } from './graph-list';

describe('graph-list', () => {
  describe('actions', () => {
    describe(openGraphList.name, () => {
      it('creates the action with the `GRAPH_LIST_OPEN` type', () => {
        const action = openGraphList();
        expect(action.type).toEqual(GRAPH_LIST_OPEN);
      });
    });
  });

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
