/* eslint-disable import/first */
import { select, takeLatest, call, put } from 'redux-saga/effects';
import { cloneableGenerator } from '@redux-saga/testing-utils';

import {
  setGraphName,
  GRAPH_SET_NAME,
  GRAPH_CREATE,
  GRAPH_CREATE_NODE,
  GRAPH_CREATE_LINK,
  GRAPH_LOAD,
  loadGraph,
  loadGraphSuccess,
  GRAPH_DELETE_NODE,
  GRAPH_DELETE_LINK,
  GRAPH_EDIT_NODE,
  GRAPH_DELETE,
  deleteGraph,
  GRAPH_EDIT_LINK,
  GRAPH_GROUPS_ADD,
  GRAPH_GROUPS_REMOVE,
  GRAPH_GROUPS_UPDATE,
  GRAPH_IMPORT_SUBGRAPH,
} from './graph.actions';
import { saveGraph, loadGraphSaga, doLoadGraph, saveGraphSaga, deleteGraphSaga, doDeleteGraph } from './graph.sagas';
import { graphSelector } from './graph.selectors';

jest.mock('../../services/graph.service', () => ({
  __esModule: true,
  default: {
    saveGraph: jest.fn(),
    removeGraph: jest.fn(),
    readGraph: jest.fn(),
  },
}));

jest.mock('../../services/graph-names.service', () => ({
  __esModule: true,
  default: {
    saveGraphName: jest.fn(),
    removeGraphName: jest.fn(),
  },
}));

import graphService from '../../services/graph.service';
import graphNamesService from '../../services/graph-names.service';

describe('graph', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('sagas', () => {
    describe(saveGraphSaga.name, () => {
      it('invokes take latest with `GRAPH_CREATE`, `GRAPH_SET_NAME`, `GRAPH_CREATE_NODE`, `GRAPH_CREATE_LINK`, `GRAPH_DELETE_NODE`, `GRAPH_DELETE_LINK`, `GRAPH_EDIT_NODE`, `GRAPH_EDIT_LINK`, GRAPH_GROUPS_ADD, GRAPH_GROUPS_REMOVE, GRAPH_GROUPS_UPDATE', async () => {
        const action = setGraphName('bar');
        const gen = cloneableGenerator(saveGraphSaga)(action);
        expect(gen.next().value).toEqual(
          takeLatest(
            [
              GRAPH_CREATE,
              GRAPH_SET_NAME,
              GRAPH_CREATE_NODE,
              GRAPH_CREATE_LINK,
              GRAPH_DELETE_NODE,
              GRAPH_DELETE_LINK,
              GRAPH_EDIT_NODE,
              GRAPH_EDIT_LINK,
              GRAPH_GROUPS_ADD,
              GRAPH_GROUPS_REMOVE,
              GRAPH_GROUPS_UPDATE,
              GRAPH_IMPORT_SUBGRAPH,
            ],
            saveGraph
          )
        );
      });
    });

    describe(saveGraph.name, () => {
      it('selects using `graphSelector`', () => {
        let gen = cloneableGenerator(saveGraph)();
        expect(gen.next().value).toEqual(select(graphSelector));
      });

      it('calls `graphService.saveGraph`', () => {
        const graph = { name: 'foo' };
        let gen = cloneableGenerator(saveGraph)();
        gen.next(); // select
        expect(gen.next(graph).value).toEqual(call([graphService, 'saveGraph'], graph));
      });

      it('calls `graphNamesService.saveGraphName`', () => {
        const graph = { id: 'uuid', name: 'foo' };
        let gen = cloneableGenerator(saveGraph)();
        gen.next(); // select
        gen.next(graph); // save graph
        expect(gen.next().value).toEqual(call([graphNamesService, 'saveGraphName'], 'uuid', 'foo'));
      });
    });

    describe(loadGraphSaga.name, () => {
      it('invokes take latest with `GRAPH_LOAD`', () => {
        const action = loadGraph('bar');
        const gen = cloneableGenerator(loadGraphSaga)(action);
        expect(gen.next().value).toEqual(takeLatest([GRAPH_LOAD], doLoadGraph));
      });
    });

    describe(doLoadGraph.name, () => {
      let action;

      beforeEach(() => {
        action = loadGraph('foo');
      });

      it('calls `graphService.readGraph` with the graph name provided in the action', () => {
        const gen = cloneableGenerator(doLoadGraph)(action);
        expect(gen.next().value).toEqual(call([graphService, 'readGraph'], action.payload));
      });

      it('puts a `loadGraphSuccess` action with the graph returned by `readGraph`', () => {
        const graph = { foo: 'bar' };
        const gen = cloneableGenerator(doLoadGraph)(action);
        gen.next();
        expect(gen.next(graph).value).toEqual(put(loadGraphSuccess(graph)));
      });
    });

    describe(deleteGraphSaga.name, () => {
      it('invokes take latest with `GRAPH_DELETE`', () => {
        const action = deleteGraph();
        const gen = cloneableGenerator(deleteGraphSaga)(action);
        expect(gen.next().value).toEqual(takeLatest([GRAPH_DELETE], doDeleteGraph));
      });
    });

    describe(doDeleteGraph.name, () => {
      it('calls `graphService.removeGraph`', () => {
        const action = { payload: 'foo' };
        let gen = cloneableGenerator(doDeleteGraph)(action);
        expect(gen.next().value).toEqual(call([graphService, 'removeGraph'], 'foo'));
      });

      it('calls `graphNamesService.removeGraphName`', () => {
        const action = { payload: 'foo' };
        let gen = cloneableGenerator(doDeleteGraph)(action);
        gen.next(); // remove graph
        expect(gen.next().value).toEqual(call([graphNamesService, 'removeGraphName'], 'foo'));
      });
    });
  });
});
