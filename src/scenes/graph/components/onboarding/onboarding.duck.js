import { createSelector } from 'reselect';
import { takeLatest, call } from 'redux-saga/effects';

import { isDismissed, markAsDismissed } from './onboarding.service';

// Actions
export const ONBOARDING_DISMISS = 'grapher/Onboarding/DISMISS';
export const ONBOARDING_SHOW = 'grapher/Onboarding/SHOW';

export const dismissOnboarding = () => ({
  type: ONBOARDING_DISMISS,
});

export const showOnboarding = () => ({
  type: ONBOARDING_SHOW,
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
    case ONBOARDING_SHOW: {
      return {
        ...state,
        open: true,
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
