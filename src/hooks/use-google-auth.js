import { useState, useEffect } from 'react';

export default function useGoogleAuth(onSignedIn) {
  const [googleAuth, setGoogleAuth] = useState(undefined);
  useEffect(() => {
    initializeGoogleAuth(onSignedIn, setGoogleAuth);
  }, [onSignedIn]);

  const signIn = async () => {
    try {
      const result = await googleAuth.signIn();
      const basicProfile = result.getBasicProfile();
      return getDataFromProfile(basicProfile);
    } catch (err) {
      console.error(err);
    }
  };

  const signOut = async () => {
    await googleAuth.signOut();
  };

  return { signIn, signOut };
}

function getDataFromProfile(basicProfile) {
  return {
    name: basicProfile.getName(),
    imageUrl: basicProfile.getImageUrl(),
  };
}

function initializeGoogleAuth(onSignedIn, setGoogleAuth) {
  if (!window.gapi) {
    setTimeout(() => initializeGoogleAuth(onSignedIn, setGoogleAuth), 100);
    return;
  }
  window.gapi.load('auth2', async () => {
    const newGoogleAuth = await window.gapi.auth2.init({
      client_id: '763957914953-pl2b8vab3sjge1l1gnc05hra24bnrueg.apps.googleusercontent.com',
    });
    if (newGoogleAuth.isSignedIn.get() && !!onSignedIn) {
      const basicProfile = newGoogleAuth.currentUser.get().getBasicProfile();
      onSignedIn(getDataFromProfile(basicProfile));
    }
    setGoogleAuth(newGoogleAuth);
  });
}
