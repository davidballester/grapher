import { NEW_GRAPH_OPEN, openNewGraph } from './new-graph';

describe('new-graph', () => {
  describe('actions', () => {
    describe('openNewGraph', () => {
      it('creates the action with the `NEW_GRAPH_OPEN` type', () => {
        const action = openNewGraph();
        expect(action.type).toEqual(NEW_GRAPH_OPEN);
      });
    });
  });
});
