import { takeLatest, call } from 'redux-saga/effects';
import { cloneableGenerator } from '@redux-saga/testing-utils';

import reducer, { ONBOARDING_DISMISS, dismissOnboarding, isOpen, doPersistDismiss, persistDismiss } from './onboarding.duck';
import { markAsDismissed } from './onboarding.service';

jest.mock('./onboarding.service', () => ({
  isDismissed: jest.fn(),
  markAsDismissed: jest.fn(),
}));

describe('onboarding.duck', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('actions', () => {
    describe(dismissOnboarding.name, () => {
      it('creates the action with the ONBOARDING_DISMISS type', () => {
        const action = dismissOnboarding();
        expect(action.type).toEqual(ONBOARDING_DISMISS);
      });
    });
  });

  describe('reducer', () => {
    describe('ONBOARDING_DISMISS', () => {
      it('sets open to false', () => {
        const action = dismissOnboarding();
        const state = reducer({ open: true }, action);
        expect(state.open).toEqual(false);
      });
    });
  });

  describe('selectors', () => {
    describe(isOpen.name, () => {
      it('gets the open property from the onboarding substate', () => {
        const open = isOpen({ onboarding: { open: true } });
        expect(open).toEqual(true);
      });
    });
  });

  describe('sagas', () => {
    describe(persistDismiss.name, () => {
      it('invokes take latest with ONBOARDING_DISMISS', () => {
        const action = dismissOnboarding();
        const gen = cloneableGenerator(persistDismiss)(action);
        expect(gen.next().value).toEqual(takeLatest([ONBOARDING_DISMISS], doPersistDismiss));
      });
    });

    describe(doPersistDismiss.name, () => {
      it('calls markAsDismissed', () => {
        const gen = cloneableGenerator(doPersistDismiss)();
        expect(gen.next().value).toEqual(call(markAsDismissed));
      });
    });
  });
});
