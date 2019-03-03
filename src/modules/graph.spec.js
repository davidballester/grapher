import { getName, setNameGraph, GRAPH_SET_NAME } from './graph';
import reducer from './graph';

describe('graph', () => {
  describe('actions', () => {
    describe('setNameGraph', () => {
      it('creates the action with the `GRAPH_SET_NAME` type', () => {
        const action = setNameGraph();
        expect(action.type).toEqual(GRAPH_SET_NAME);
      });

      it('creates the payload provided', () => {
        const expectedPayload = 'foo';
        const action = setNameGraph(expectedPayload);
        const payload = action.payload;
        expect(payload).toEqual(expectedPayload);
      });
    });
  });

  describe('reducer', () => {
    describe('GRAPH_SET_NAME', () => {
      it('sets the `name` in the state to the payload of the given action', () => {
        const initialState = {
          name: undefined,
        };
        const expectedName = 'foo';
        const action = setNameGraph(expectedName);
        const state = reducer(initialState, action);
        expect(state.name).toEqual(expectedName);
      });
    });
  });

  describe('selectors', () => {
    describe('getName', () => {
      it('extracts `name` from the graph substate', () => {
        const expectedName = 'foo';
        const appState = {
          graph: {
            name: expectedName,
          },
        };
        const name = getName(appState);
        expect(name).toEqual(expectedName);
      });
    });
  });
});
