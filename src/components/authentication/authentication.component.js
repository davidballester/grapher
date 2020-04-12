import React, { useState, useEffect } from 'react';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';

import { initializeAuthProvider, signIn } from '../../services/google-auth';
import LoggedInPopover from '../logged-in-popover';

export default function Authentication({ setAuth, setAuthProvider, isSignedIn, imageUrl, authProvider }) {
  useEffect(() => {
    if (!authProvider) {
      initializeAuthProvider(({ id, name, imageUrl }) => setAuth(id, name, imageUrl), setAuthProvider);
    }
  }, [authProvider, setAuth, setAuthProvider]);
  if (!isSignedIn) {
    return (
      <SignInButton
        onSignIn={async () => {
          const profile = await signIn(authProvider);
          if (!!profile) {
            const { id, name, imageUrl } = profile;
            setAuth(id, name, imageUrl);
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
