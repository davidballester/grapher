import { takeLatest, call } from 'redux-saga/effects';
import { cloneableGenerator } from '@redux-saga/testing-utils';

import { GRAPH_LIST_OPEN } from './graph-list';
import { GRAPH_OPEN, GRAPH_CREATE } from './graph';
import { NEW_GRAPH_OPEN } from './new-graph';
import { ROUTES } from '../constants';

jest.mock('../services/history', () => ({
  __esModule: true,
  default: {
    push: jest.fn(),
  },
}));

// eslint-disable-next-line import/first
import history from '../services/history';
// eslint-disable-next-line import/first
import { navigateSaga, navigate } from './navigation';

describe('navigation', () => {
  describe(navigateSaga.name, () => {
    it('invokes take latest with `NEW_GRAPH_OPEN`, `GRAPH_LIST_OPEN`, `GRAPH_OPEN`, `GRAPH_CREATE`', () => {
      const gen = cloneableGenerator(navigateSaga)({});
      expect(gen.next().value).toEqual(takeLatest([NEW_GRAPH_OPEN, GRAPH_LIST_OPEN, GRAPH_OPEN, GRAPH_CREATE], navigate));
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
  });
});
