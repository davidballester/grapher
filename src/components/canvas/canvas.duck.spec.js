import { takeLatest, call } from 'redux-saga/effects';
import { cloneableGenerator } from '@redux-saga/testing-utils';

import reducer, { CANVAS_REGISTER_CANVAS_COMPONENT, CANVAS_REFRESH, refresh, registerCanvasComponent, refreshSaga, doRefresh } from './canvas.duck';

describe('canvas', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('actions', () => {
    describe(registerCanvasComponent.name, () => {
      it('creates the action with the `CANVAS_REGISTER_CANVAS_COMPONENT` type', () => {
        const action = registerCanvasComponent();
        expect(action.type).toEqual(CANVAS_REGISTER_CANVAS_COMPONENT);
      });

      it('contains the given argument as payload', () => {
        const payload = 'foo';
        const action = registerCanvasComponent(payload);
        expect(action.payload).toEqual(payload);
      });
    });

    describe(refresh.name, () => {
      it('creates the action with the `CANVAS_REFRESH` type', () => {
        const action = refresh();
        expect(action.type).toEqual(CANVAS_REFRESH);
      });
    });
  });

  describe(reducer.name, () => {
    describe('CANVAS_REGISTER_CANVAS_COMPONENT', () => {
      it("sets the action's payload as the canvas component", () => {
        const canvasComponent = { foo: 'bar' };
        const initialState = {};
        const action = registerCanvasComponent(canvasComponent);
        const state = reducer(initialState, action);
        expect(state).toEqual({ canvasComponent });
      });
    });
  });

  describe('sagas', () => {
    describe(refreshSaga.name, () => {
      it('invokes take latest with `CANVAS_REFRESH`', async () => {
        const action = refresh();
        const gen = cloneableGenerator(refreshSaga)(action);
        expect(gen.next().value).toEqual(takeLatest([CANVAS_REFRESH], doRefresh));
      });
    });

    describe(doRefresh.name, () => {
      const action = refresh();

      it('selects from the state', () => {
        const gen = cloneableGenerator(doRefresh)(action);
        expect(gen.next().value.type).toEqual('SELECT');
      });

      it('calls refresh on the received selected canvas component', async () => {
        const canvasComponent = { foo: 'bar', refresh: jest.fn() };
        const gen = cloneableGenerator(doRefresh)(action);
        gen.next();
        expect(gen.next(canvasComponent).value).toEqual(call([canvasComponent, 'refresh']));
      });
    });
  });
});
