export const AUTH_SET = 'grapher/Auth/SET';
export const AUTH_UNSET = 'grapher/Auth/UNSET';

const initialState = {
  signedIn: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_SET: {
      const { name, imageUrl } = action.payload;
      return {
        ...state,
        signedIn: true,
        name,
        imageUrl,
      };
    }
    case AUTH_UNSET: {
      return {
        ...state,
        signedIn: false,
        name: undefined,
        imageUrl: undefined,
      };
    }
    default: {
      return state;
    }
  }
}

export function setAuth(name, imageUrl) {
  return {
    type: AUTH_SET,
    payload: {
      name,
      imageUrl,
    },
  };
}

export function unsetAuth() {
  return {
    type: AUTH_UNSET,
  };
}

function authSelector(state) {
  return state.auth;
}

export function isSignedIn(state) {
  return authSelector(state).signedIn;
}

export function getName(state) {
  return authSelector(state).name;
}

export function getImageUrl(state) {
  return authSelector(state).imageUrl;
}
