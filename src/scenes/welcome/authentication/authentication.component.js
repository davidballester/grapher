import React, { useState, useCallback } from 'react';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';

import useGoogleAuth from '../../../hooks/use-google-auth';
import LoggedInPopover from '../logged-in-popover';

export default function Authentication({ setAuth, isSignedIn, imageUrl }) {
  const useGoogleAuthCallback = useCallback(({ name, imageUrl }) => setAuth(name, imageUrl), [setAuth]);
  const { signIn } = useGoogleAuth(useGoogleAuthCallback);
  if (!isSignedIn) {
    return (
      <SignInButton
        onSignIn={async () => {
          const profile = await signIn();
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
