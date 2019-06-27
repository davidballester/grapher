import { createSelector } from 'reselect';
import { takeLatest, call, select } from 'redux-saga/effects';

export const CANVAS_REGISTER_CANVAS_COMPONENT = 'grapher/Canvas/REGISTER_CANVAS_COMPONENT';
export const CANVAS_REFRESH = 'grapher/Canvas/REFRESH';

const initialState = {
  canvasComponent: undefined,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CANVAS_REGISTER_CANVAS_COMPONENT: {
      return {
        ...state,
        canvasComponent: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}

export function registerCanvasComponent(canvasComponent) {
  return {
    type: CANVAS_REGISTER_CANVAS_COMPONENT,
    payload: canvasComponent,
  };
}

export function refresh() {
  return {
    type: CANVAS_REFRESH,
  };
}

function canvasSelector(state) {
  return state.canvas;
}

const getCanvasComponent = createSelector(
  canvasSelector,
  (canvas) => canvas.canvasComponent
);

export function* doRefresh() {
  const canvasComponent = yield select(getCanvasComponent);
  yield call([canvasComponent, 'refresh']);
}

export function* refreshSaga() {
  yield takeLatest([CANVAS_REFRESH], doRefresh);
}
