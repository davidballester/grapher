export const THEME_TOGGLE = 'grapher/Theme/TOGGLE';
export const THEME_INITIALIZE = 'grapher/Theme/INITIALIZE';

const initialState = {
  darkMode: undefined,
  initialized: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case THEME_INITIALIZE: {
      return {
        ...state,
        darkMode: action.payload,
        initialized: true,
      };
    }
    case THEME_TOGGLE: {
      return {
        ...state,
        darkMode: !state.darkMode,
      };
    }
    default: {
      return state;
    }
  }
}

export function toggleTheme() {
  return {
    type: THEME_TOGGLE,
  };
}

export function initializeTheme(darkMode) {
  return {
    type: THEME_INITIALIZE,
    payload: darkMode,
  };
}

export function isDarkMode(state) {
  return state.theme.darkMode;
}

export function isInitialized(state) {
  return state.theme.initialized;
}
