import { takeLatest, call } from 'redux-saga/effects';
import { cloneableGenerator } from '@redux-saga/testing-utils';

import { NEW_GRAPH_OPEN, NEW_GRAPH_CLOSE } from './new-graph';
import { GRAPH_LOAD } from './graph';

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
    it('invokes take latest with `NEW_GRAPH_OPEN`, `NEW_GRAPH_CLOSE`, `GRAPH_LOAD`', () => {
      const gen = cloneableGenerator(navigateSaga)({});
      expect(gen.next().value).toEqual(takeLatest([NEW_GRAPH_OPEN, NEW_GRAPH_CLOSE, GRAPH_LOAD], navigate));
    });
  });

  describe(navigate.name, () => {
    it('pushes `/graph/new` to `history` if a `NEW_GRAPH_OPEN` action is received', () => {
      const gen = cloneableGenerator(navigate)({ type: NEW_GRAPH_OPEN });
      expect(gen.next().value).toEqual(call([history, 'push'], '/graph/new'));
    });

    it('pushes `/` to `history` if a `NEW_GRAPH_CLOSE` action is received', () => {
      const gen = cloneableGenerator(navigate)({ type: NEW_GRAPH_CLOSE });
      expect(gen.next().value).toEqual(call([history, 'push'], '/'));
    });

    it('pushes `/graph/<GRAPH_NAME>` to `history` if a `GRAPH_LOAD` action is received', () => {
      const gen = cloneableGenerator(navigate)({ type: GRAPH_LOAD, payload: 'foo' });
      expect(gen.next().value).toEqual(call([history, 'push'], '/graph/foo'));
    });
  });
});
