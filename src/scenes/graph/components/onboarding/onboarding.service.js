const dismissedOnboardingLocalStorageKey = 'grapher/onboarding/dimissed';

export const isDismissed = () => localStorage.getItem(dismissedOnboardingLocalStorageKey) === 'true';

export const markAsDismissed = () => localStorage.setItem(dismissedOnboardingLocalStorageKey, 'true');
