import React, { useState, useEffect } from 'react';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';

import { initializeGoogleAuth, signIn } from '../../services/google-auth';
import LoggedInPopover from '../logged-in-popover';

export default function Authentication({ setAuth, setGoogleAuth, isSignedIn, imageUrl, googleAuth }) {
  useEffect(() => {
    if (!googleAuth) {
      initializeGoogleAuth(({ name, imageUrl }) => setAuth(name, imageUrl), setGoogleAuth);
    }
  }, [googleAuth, setAuth, setGoogleAuth]);
  if (!isSignedIn) {
    return (
      <SignInButton
        onSignIn={async () => {
          const profile = await signIn(googleAuth);
          if (!!profile) {
            const { name, imageUrl } = profile;
            setAuth(name, imageUrl);
          }
        }}
      />
    );
  }
  return <SignedInButton imageUrl={imageUrl} />;
}

function SignInButton({ onSignIn }) {
  return (
    <Button variant="text" onClick={onSignIn} color="inherit">
      Sign in
    </Button>
  );
}

function SignedInButton({ imageUrl }) {
  const [anchorEl, setAnchorEl] = useState(undefined);
  return (
    <>
      <IconButton onClick={(event) => setAnchorEl(event.currentTarget)}>
        <Avatar src={imageUrl} />
      </IconButton>
      <LoggedInPopover anchorEl={anchorEl} handleClose={() => setAnchorEl(undefined)} />
    </>
  );
}
