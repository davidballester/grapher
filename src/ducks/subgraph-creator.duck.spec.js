/* eslint-disable import/first */
import { select, takeLatest, put, delay, call } from 'redux-saga/effects';
import { cloneableGenerator } from '@redux-saga/testing-utils';

jest.mock('../services/graph-grammar', () => ({
  match: jest.fn(),
  eval: jest.fn(),
}));

import graphGrammar from '../services/graph-grammar';

import reducer, {
  SUBGRAPH_CREATOR_OPEN,
  SUBGRAPH_CREATOR_CLOSE,
  SUBGRAPH_PROCESS,
  SUBGRAPH_PROCESS_SUCCESS,
  SUBGRAPH_PROCESS_FAILURE,
  SUBGRAPH_IMPORT,
  openSubgraphCreator,
  closeSubgraphCreator,
  processSubgraph,
  processSubgraphSuccess,
  processSubgraphFailure,
  importSubgraph,
  getError,
  getNodes,
  getLinks,
  getGroups,
  subgraphProcessSaga,
  subgraphProcess,
  importSubgraphSaga,
  doImportSubgraph,
  getProcessing,
} from './subgraph-creator.duck';
import { importSubgraph as graphImportSubgraph } from './graph';

describe('subgraph-creator', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('actions', () => {
    describe(openSubgraphCreator.name, () => {
      it('creates the action with the `SUBGRAPH_CREATOR_OPEN` type', () => {
        const action = openSubgraphCreator();
        expect(action.type).toEqual(SUBGRAPH_CREATOR_OPEN);
      });
    });

    describe(closeSubgraphCreator.name, () => {
      it('creates the action with the `SUBGRAPH_CREATOR_CLOSE` type', () => {
        const action = closeSubgraphCreator();
        expect(action.type).toEqual(SUBGRAPH_CREATOR_CLOSE);
      });
    });

    describe(processSubgraph.name, () => {
      it('creates the action with the `SUBGRAPH_PROCESS` type', () => {
        const action = processSubgraph();
        expect(action.type).toEqual(SUBGRAPH_PROCESS);
      });

      it('creates the action with the provided string as payload', () => {
        const subgraphString = 'foo';
        const action = processSubgraph(subgraphString);
        expect(action.payload).toEqual(subgraphString);
      });
    });

    describe(processSubgraphSuccess.name, () => {
      it('creates the action with the `SUBGRAPH_PROCESS_SUCCESS` type', () => {
        const action = processSubgraphSuccess();
        expect(action.type).toEqual(SUBGRAPH_PROCESS_SUCCESS);
      });

      it('creates the action with the provided object as payload', () => {
        const subgraph = { foo: 'bar' };
        const action = processSubgraphSuccess(subgraph);
        expect(action.payload).toEqual(subgraph);
      });
    });

    describe(processSubgraphFailure.name, () => {
      it('creates the action with the `SUBGRAPH_PROCESS_FAILURE` type', () => {
        const action = processSubgraphFailure();
        expect(action.type).toEqual(SUBGRAPH_PROCESS_FAILURE);
      });
    });

    describe(importSubgraph.name, () => {
      it('creates the action with the `SUBGRAPH_IMPORT` type', () => {
        const action = importSubgraph();
        expect(action.type).toEqual(SUBGRAPH_IMPORT);
      });
    });
  });

  describe(reducer.name, () => {
    describe('SUBGRAPH_PROCESS', () => {
      it('sets the processing flag to true', () => {
        const action = processSubgraph();
        const state = reducer({ processing: false }, action);
        expect(state.processing).toBeTruthy();
      });
    });

    describe('SUBGRAPH_PROCESS_SUCCESS', () => {
      it('sets the nodes to the ones in the payload', () => {
        const subgraph = {
          nodes: [{ id: 'foo' }, { id: 'bar' }],
        };
        const action = processSubgraphSuccess(subgraph);
        const state = reducer(undefined, action);
        expect(state.nodes).toEqual(subgraph.nodes);
      });

      it('sets the links to the ones in the payload', () => {
        const subgraph = {
          links: [{ id: 'foo' }, { id: 'bar' }],
        };
        const action = processSubgraphSuccess(subgraph);
        const state = reducer(undefined, action);
        expect(state.links).toEqual(subgraph.links);
      });

      it('sets the groups to the ones in the payload', () => {
        const subgraph = {
          groups: [{ id: 'foo' }, { id: 'bar' }],
        };
        const action = processSubgraphSuccess(subgraph);
        const state = reducer(undefined, action);
        expect(state.groups).toEqual(subgraph.groups);
      });

      it('sets the error to false', () => {
        const subgraph = {};
        const action = processSubgraphSuccess(subgraph);
        const state = reducer(undefined, action);
        expect(state.error).toBeFalsy();
      });

      it('sets the processing to false', () => {
        const action = processSubgraphSuccess({});
        const state = reducer({ processing: true }, action);
        expect(state.processing).toBeFalsy();
      });
    });

    describe('SUBGRAPH_PROCESS_FAILURE', () => {
      it('sets the error to false', () => {
        const action = processSubgraphFailure();
        const state = reducer(undefined, action);
        expect(state.error).toBeTruthy();
      });

      it('does not modify the nodes, the links or the groups', () => {
        const initialState = {
          nodes: [{ id: 'foo' }],
          links: [{ id: 'bar' }],
          groups: [{ id: 'baz' }],
        };
        const action = processSubgraphFailure();
        const state = reducer(initialState, action);
        expect(state).toMatchObject({
          nodes: initialState.nodes,
          links: initialState.links,
          groups: initialState.groups,
        });
      });

      it('sets the processing to false', () => {
        const action = processSubgraphFailure({});
        const state = reducer({ processing: true }, action);
        expect(state.processing).toBeFalsy();
      });
    });

    describe('SUBGRAPH_CREATOR_CLOSE', () => {
      it('sets the error to false', () => {
        const action = closeSubgraphCreator();
        const state = reducer(undefined, action);
        expect(state.error).toBeFalsy();
      });

      it('empties the nodes', () => {
        const action = closeSubgraphCreator();
        const state = reducer(undefined, action);
        expect(state.nodes).toEqual([]);
      });

      it('empties the links', () => {
        const action = closeSubgraphCreator();
        const state = reducer(undefined, action);
        expect(state.links).toEqual([]);
      });

      it('empties the groups', () => {
        const action = closeSubgraphCreator();
        const state = reducer(undefined, action);
        expect(state.groups).toEqual([]);
      });
    });
  });

  describe('selectors', () => {
    describe(getError.name, () => {
      it('extracts the error from subgraph creator the substate', () => {
        const appState = {
          subgraphCreator: {
            error: true,
          },
        };
        const error = getError(appState);
        expect(error).toBeTruthy();
      });
    });

    describe(getNodes.name, () => {
      it('extracts the nodes from subgraph creator the substate', () => {
        const appState = {
          subgraphCreator: {
            nodes: [
              {
                id: 'foo',
              },
            ],
          },
        };
        const nodes = getNodes(appState);
        expect(nodes).toEqual(appState.subgraphCreator.nodes);
      });
    });

    describe(getLinks.name, () => {
      it('extracts the links from subgraph creator the substate', () => {
        const appState = {
          subgraphCreator: {
            links: [
              {
                id: 'foo',
              },
            ],
          },
        };
        const links = getLinks(appState);
        expect(links).toEqual(appState.subgraphCreator.links);
      });
    });

    describe(getGroups.name, () => {
      it('extracts the groups from subgraph creator the substate', () => {
        const appState = {
          subgraphCreator: {
            groups: [
              {
                id: 'foo',
              },
            ],
          },
        };
        const groups = getGroups(appState);
        expect(groups).toEqual(appState.subgraphCreator.groups);
      });
    });

    describe(getProcessing.name, () => {
      it('extracts the processing from subgraph creator the substate', () => {
        const appState = {
          subgraphCreator: {
            processing: true,
          },
        };
        const processing = getProcessing(appState);
        expect(processing).toBeTruthy();
      });
    });
  });

  describe('sagas', () => {
    describe(subgraphProcessSaga.name, () => {
      it('invokes take latest with `SUBGRAPH_PROCESS`', () => {
        const action = processSubgraph();
        const gen = cloneableGenerator(subgraphProcessSaga)(action);
        expect(gen.next().value).toEqual(takeLatest([SUBGRAPH_PROCESS], subgraphProcess));
      });
    });

    describe(subgraphProcess.name, () => {
      const action = processSubgraph('foo');

      it('delays', () => {
        const gen = cloneableGenerator(subgraphProcess)(action);
        expect(gen.next().value).toEqual(delay(expect.anything()));
      });

      it('matches the substring using the graph grammar', () => {
        const gen = cloneableGenerator(subgraphProcess)(action);
        gen.next();
        expect(gen.next().value).toEqual(call([graphGrammar, 'match'], 'foo'));
      });

      it('puts a failure action if the result of the match is a failure', () => {
        const gen = cloneableGenerator(subgraphProcess)(action);
        gen.next();
        gen.next();
        expect(
          gen.next({
            succeeded: () => false,
          }).value
        ).toEqual(put(processSubgraphFailure()));
      });

      it('evals using the grammar result if the match succeeds', () => {
        const matchResult = {
          succeeded: () => true,
        };
        const gen = cloneableGenerator(subgraphProcess)(action);
        gen.next();
        gen.next();
        expect(gen.next(matchResult).value).toEqual(call([graphGrammar, 'eval'], matchResult));
      });

      it('puts a success action with the result of the eval', () => {
        const result = { foo: 'bar' };
        const gen = cloneableGenerator(subgraphProcess)(action);
        gen.next();
        gen.next();
        gen.next({
          succeeded: () => true,
        });
        expect(gen.next(result).value).toEqual(put(processSubgraphSuccess(result)));
      });
    });

    describe(importSubgraphSaga.name, () => {
      it('invokes take latest with `SUBGRAPH_IMPORT`', () => {
        const action = processSubgraph();
        const gen = cloneableGenerator(importSubgraphSaga)(action);
        expect(gen.next().value).toEqual(takeLatest([SUBGRAPH_IMPORT], doImportSubgraph));
      });
    });

    describe(doImportSubgraph.name, () => {
      it('selects nodes', () => {
        const gen = cloneableGenerator(doImportSubgraph)();
        expect(gen.next().value).toEqual(select(getNodes));
      });

      it('selects links', () => {
        const gen = cloneableGenerator(doImportSubgraph)();
        gen.next();
        expect(gen.next().value).toEqual(select(getLinks));
      });

      it('selects groups', () => {
        const gen = cloneableGenerator(doImportSubgraph)();
        gen.next();
        gen.next();
        expect(gen.next().value).toEqual(select(getGroups));
      });

      it('puts a graphImportSubgraph action with the selected nodes, links and groups', () => {
        const nodes = { foo: 'bar' };
        const links = { bar: 'baz' };
        const groups = { baz: 'qux' };
        const gen = cloneableGenerator(doImportSubgraph)();
        gen.next();
        gen.next(nodes);
        gen.next(links);
        expect(gen.next(groups).value).toEqual(put(graphImportSubgraph(nodes, links, groups)));
      });

      it('puts a closeImportSubgraph action', () => {
        const gen = cloneableGenerator(doImportSubgraph)();
        gen.next();
        gen.next();
        gen.next();
        gen.next();
        expect(gen.next().value).toEqual(put(closeSubgraphCreator()));
      });
    });
  });
});
