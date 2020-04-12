import firebase from 'firebase/app';
import 'firebase/auth';

// We use a listener to wait for the auth object to be initialized so we can access a user already logged in. However,
// if the user triggers the login manually, we do not want the listener to be triggered too, so we unsubscribe from it
// before performing the manual login logic.
let onAuthStateChangedUnsubscribe;

function getUserData(user) {
  return {
    name: user.displayName,
    imageUrl: user.photoURL,
  };
}

export function initializeAuthProvider(onUserLoggedIn, setAuthProvider) {
  const authProvider = new firebase.auth.GoogleAuthProvider();
  authProvider.addScope('https://www.googleapis.com/auth/firebase.database');
  setAuthProvider(authProvider);
  // If the user is already logged in, wait for auth to tell us. Unsubscribe from this if the user triggers the login manually so it does not get executed.
  onAuthStateChangedUnsubscribe = firebase.auth().onAuthStateChanged((currentUser) => {
    if (!!currentUser) {
      onUserLoggedIn(getUserData(currentUser));
    }
  });
}

export async function signIn(authProvider) {
  try {
    // Unsubscribe from the initial loogged user listeners so this is the only logic triggered
    if (!!onAuthStateChangedUnsubscribe) {
      onAuthStateChangedUnsubscribe();
    }
    const authResult = await firebase.auth().signInWithPopup(authProvider);
    const user = authResult.user;
    return getUserData(user);
  } catch (err) {
    console.error(err);
  }
}

export async function signOut() {
  try {
    await firebase.auth().signOut();
  } catch (err) {
    console.error(err);
  }
}
