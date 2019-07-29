import { createSelector } from 'reselect';
import { takeLatest, call } from 'redux-saga/effects';

import { isDismissed, markAsDismissed } from './onboarding.service';

// Actions
export const ONBOARDING_DISMISS = 'grapher/Onboarding/DISMISS';

export const dismissOnboarding = () => ({
  type: ONBOARDING_DISMISS,
});

// Reducer
const initialState = {
  open: !isDismissed(),
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ONBOARDING_DISMISS: {
      return {
        ...state,
        open: false,
      };
    }
    default: {
      return state;
    }
  }
};

// Selectors
const getOnboarding = (state) => state.onboarding;
export const isOpen = createSelector(
  getOnboarding,
  (onboardingState) => onboardingState.open
);

// Sagas
export function* doPersistDismiss() {
  yield call(markAsDismissed);
}

export function* persistDismiss() {
  yield takeLatest([ONBOARDING_DISMISS], doPersistDismiss);
}
