import { GRAPH_LIST_OPEN, openGraphList } from './graph-list';

describe('graph-list', () => {
  describe('actions', () => {
    describe('openGraphList', () => {
      it('creates the action with the `GRAPH_LIST_OPEN` type', () => {
        const action = openGraphList();
        expect(action.type).toEqual(GRAPH_LIST_OPEN);
      });
    });
  });
});
