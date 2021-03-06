/* eslint-disable import/first */
import { takeLatest, call } from 'redux-saga/effects';
import { cloneableGenerator } from '@redux-saga/testing-utils';

import { GRAPH_CREATE, GRAPH_DELETE } from './graph';
import { GRAPH_IMPORT_SUCCESS } from '../scenes/welcome/graph-import/graph-import.duck';
import { ROUTES } from '../constants';
import { AUTH_UNSET } from './auth.duck';

jest.mock('../services/history.service', () => ({
  __esModule: true,
  default: {
    push: jest.fn(),
  },
}));

import history from '../services/history.service';
import { navigateSaga, navigate, GRAPH_OPEN, openGraph, GRAPH_LIST_OPEN, openGraphList } from './navigation.duck';

describe('navigation', () => {
  describe('actions', () => {
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
      it('invokes take latest with `GRAPH_LIST_OPEN`, `GRAPH_OPEN`, `GRAPH_CREATE`, `GRAPH_DELETE`, AUTH_UNSET', () => {
        const gen = cloneableGenerator(navigateSaga)({});
        expect(gen.next().value).toEqual(
          takeLatest([GRAPH_LIST_OPEN, GRAPH_OPEN, GRAPH_CREATE, GRAPH_DELETE, GRAPH_IMPORT_SUCCESS, AUTH_UNSET], navigate)
        );
      });
    });

    describe(navigate.name, () => {
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

      it(`pushes '${ROUTES.GRAPH}' to 'history' if a 'GRAPH_IMPORT_SUCCESS' action is received`, () => {
        const gen = cloneableGenerator(navigate)({ type: GRAPH_IMPORT_SUCCESS, payload: { name: 'bar', id: 'foo' } });
        expect(gen.next().value).toEqual(call([history, 'push'], `${ROUTES.GRAPHS}/foo`));
      });

      it(`pushes '${ROUTES.BASE}' to 'history' if a 'AUTH_UNSET' action is received`, () => {
        const gen = cloneableGenerator(navigate)({ type: AUTH_UNSET });
        expect(gen.next().value).toEqual(call([history, 'push'], ROUTES.BASE));
      });
    });
  });
});
