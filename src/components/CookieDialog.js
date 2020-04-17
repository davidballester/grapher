import React, { useState, forwardRef } from 'react';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

import { ROUTES } from '../constants';
import CustomDialog from './CustomDialog';

const storageKey = 'grapher/cookiedialog/accepted';

export default function CookieDialog() {
  const [open, setOpen] = useState(localStorage.getItem(storageKey) !== 'true');
  return (
    <CustomDialog open={open} aria-labelledby="cookie-dialog-title" aria-describedby="cookie-dialog-description">
      <DialogTitle id="cookie-dialog-title">Do you accept our cookies policy?</DialogTitle>
      <DialogContent>
        <DialogContentText id="cookie-dialog-description">
          We use third party cookies to provide authentication capabilities using Google's Firebase. By using this website, you agree to the use of
          these cookies. For more information, see our{' '}
          <Link
            component={forwardRef((props, ref) => (
              <RouterLink to={ROUTES.COOKIE_POLICY} {...props} ref={ref} />
            ))}
          >
            cookie policy
          </Link>
          .
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            localStorage.setItem(storageKey, 'true');
            setOpen(false);
          }}
          color="primary"
        >
          Agree
        </Button>
      </DialogActions>
    </CustomDialog>
  );
}
