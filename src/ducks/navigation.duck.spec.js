/* eslint-disable import/first */
import { takeLatest, call, select } from 'redux-saga/effects';
import { cloneableGenerator } from '@redux-saga/testing-utils';

import { GRAPH_CREATE, GRAPH_DELETE, getId } from './graph';
import { GRAPH_IMPORT_SUCCESS } from '../scenes/graph-import/graph-import.duck';
import { SUBGRAPH_CREATOR_OPEN, SUBGRAPH_CREATOR_CLOSE } from './subgraph-creator.duck';
import { ROUTES } from '../constants';

jest.mock('../services/history.service', () => ({
  __esModule: true,
  default: {
    push: jest.fn(),
  },
}));

import history from '../services/history.service';
import {
  navigateSaga,
  navigate,
  openImportGraph,
  GRAPH_IMPORT_OPEN,
  NEW_GRAPH_OPEN,
  openNewGraph,
  GRAPH_OPEN,
  openGraph,
  GRAPH_LIST_OPEN,
  openGraphList,
} from './navigation.duck';

describe('navigation', () => {
  describe('actions', () => {
    describe(openImportGraph.name, () => {
      it('creates the action with the `GRAPH_IMPORT_OPEN` type', () => {
        const action = openImportGraph();
        expect(action.type).toEqual(GRAPH_IMPORT_OPEN);
      });
    });

    describe(openNewGraph.name, () => {
      it('creates the action with the `NEW_GRAPH_OPEN` type', () => {
        const action = openNewGraph();
        expect(action.type).toEqual(NEW_GRAPH_OPEN);
      });
    });

    describe(openGraph.name, () => {
      it('creates the action with the `GRAPH_OPEN` type', () => {
        const action = openGraph();
        expect(action.type).toEqual(GRAPH_OPEN);
      });

      it('creates the payload provided', () => {
        const payload = 'foo';
        const action = openGraph(payload);
        expect(action.payload).toEqual(payload);
      });
    });

    describe(openGraphList.name, () => {
      it('creates the action with the `GRAPH_LIST_OPEN` type', () => {
        const action = openGraphList();
        expect(action.type).toEqual(GRAPH_LIST_OPEN);
      });
    });
  });

  describe('sagas', () => {
    describe(navigateSaga.name, () => {
      it('invokes take latest with `NEW_GRAPH_OPEN`, `GRAPH_LIST_OPEN`, `GRAPH_OPEN`, `GRAPH_CREATE`, `GRAPH_DELETE`', () => {
        const gen = cloneableGenerator(navigateSaga)({});
        expect(gen.next().value).toEqual(
          takeLatest(
            [
              NEW_GRAPH_OPEN,
              GRAPH_LIST_OPEN,
              GRAPH_OPEN,
              GRAPH_CREATE,
              GRAPH_DELETE,
              GRAPH_IMPORT_OPEN,
              GRAPH_IMPORT_SUCCESS,
              SUBGRAPH_CREATOR_OPEN,
              SUBGRAPH_CREATOR_CLOSE,
            ],
            navigate
          )
        );
      });
    });

    describe(navigate.name, () => {
      it(`pushes '${ROUTES.NEW_GRAPH}' to 'history' if a 'NEW_GRAPH_OPEN' action is received`, () => {
        const gen = cloneableGenerator(navigate)({ type: NEW_GRAPH_OPEN });
        expect(gen.next().value).toEqual(call([history, 'push'], ROUTES.NEW_GRAPH));
      });

      it(`pushes '${ROUTES.BASE}' to 'history' if a 'GRAPH_LIST_OPEN' action is received`, () => {
        const gen = cloneableGenerator(navigate)({ type: GRAPH_LIST_OPEN });
        expect(gen.next().value).toEqual(call([history, 'push'], ROUTES.BASE));
      });

      it(`pushes '${ROUTES.GRAPH}' to 'history' if a 'GRAPH_OPEN' action is received`, () => {
        const gen = cloneableGenerator(navigate)({ type: GRAPH_OPEN, payload: 'foo' });
        expect(gen.next().value).toEqual(call([history, 'push'], `${ROUTES.GRAPHS}/foo`));
      });

      it(`pushes '${ROUTES.GRAPH}' to 'history' if a 'GRAPH_CREATE' action is received`, () => {
        const gen = cloneableGenerator(navigate)({ type: GRAPH_CREATE, payload: { name: 'bar', id: 'foo' } });
        expect(gen.next().value).toEqual(call([history, 'push'], `${ROUTES.GRAPHS}/foo`));
      });

      it(`pushes '${ROUTES.BASE}' to 'history' if a 'GRAPH_DELETE' action is received`, () => {
        const gen = cloneableGenerator(navigate)({ type: GRAPH_DELETE });
        expect(gen.next().value).toEqual(call([history, 'push'], ROUTES.BASE));
      });

      it(`pushes '${ROUTES.IMPORT_GRAPH}' to 'history' if a 'GRAPH_IMPORT_OPEN' action is received`, () => {
        const gen = cloneableGenerator(navigate)({ type: GRAPH_IMPORT_OPEN });
        expect(gen.next().value).toEqual(call([history, 'push'], ROUTES.IMPORT_GRAPH));
      });

      it(`pushes '${ROUTES.GRAPH}' to 'history' if a 'GRAPH_IMPORT_SUCCESS' action is received`, () => {
        const gen = cloneableGenerator(navigate)({ type: GRAPH_IMPORT_SUCCESS, payload: { name: 'bar', id: 'foo' } });
        expect(gen.next().value).toEqual(call([history, 'push'], `${ROUTES.GRAPHS}/foo`));
      });

      it(`selects the graph ID if a ${SUBGRAPH_CREATOR_OPEN} action is received`, () => {
        const gen = cloneableGenerator(navigate)({ type: SUBGRAPH_CREATOR_OPEN });
        expect(gen.next().value).toEqual(select(getId));
      });

      it(`pushes '${ROUTES.SUBGRAPH_CREATOR}' to 'history' if a 'GRAPH_IMPORT_SUCCESS' action is received`, () => {
        const gen = cloneableGenerator(navigate)({ type: SUBGRAPH_CREATOR_OPEN });
        gen.next();
        expect(gen.next('foo').value).toEqual(call([history, 'push'], ROUTES.SUBGRAPH_CREATOR.replace(':graphId', 'foo')));
      });

      it(`selects the graph ID if a ${SUBGRAPH_CREATOR_CLOSE} action is received`, () => {
        const gen = cloneableGenerator(navigate)({ type: SUBGRAPH_CREATOR_CLOSE });
        expect(gen.next().value).toEqual(select(getId));
      });

      it(`pushes '${ROUTES.GRAPH}' to 'history' if a 'GRAPH_IMPORT_CLOSE' action is received`, () => {
        const gen = cloneableGenerator(navigate)({ type: SUBGRAPH_CREATOR_CLOSE });
        gen.next();
        expect(gen.next('foo').value).toEqual(call([history, 'push'], ROUTES.GRAPH.replace(':graphId', 'foo')));
      });
    });
  });
});
