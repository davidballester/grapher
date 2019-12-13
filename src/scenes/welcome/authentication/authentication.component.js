import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';

import useGoogleAuth from '../../../hooks/use-google-auth';

export default function Authentication({ setAuth, unsetAuth, isSignedIn, imageUrl }) {
  const { signIn, signOut } = useGoogleAuth(({ name, imageUrl }) => setAuth(name, imageUrl));
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
  return (
    <SignedInButton
      imageUrl={imageUrl}
      onSignOut={async () => {
        await signOut();
        unsetAuth();
      }}
    />
  );
}

function SignInButton({ onSignIn }) {
  return (
    <Button variant="text" onClick={onSignIn} color="inherit">
      Sign in
    </Button>
  );
}

function SignedInButton({ imageUrl, onSignOut }) {
  const [anchorEl, setAnchorEl] = useState(undefined);
  return (
    <>
      <IconButton onClick={(event) => setAnchorEl(event.currentTarget)}>
        <Avatar src={imageUrl} />
      </IconButton>
      <LoggedInMenu anchorEl={anchorEl} handleClose={() => setAnchorEl(undefined)} onSignOut={onSignOut} />
    </>
  );
}

function LoggedInMenu({ anchorEl, handleClose, onSignOut }) {
  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={!!anchorEl}
      onClose={handleClose}
    >
      <MenuItem onClick={onSignOut}>Sign out</MenuItem>
    </Menu>
  );
}
