import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { ROUTES } from '../../../../../constants';
import history from '../../../../../services/history.service';

function BackButton({ location, ...props }) {
  const { pathname } = location;
  if (pathname === ROUTES.BASE || pathname === ROUTES.GRAPHS) {
    return null;
  }
  return (
    <IconButton color="inherit" {...props} onClick={() => history.goBack()}>
      <ArrowBackIcon />
    </IconButton>
  );
}

BackButton.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default BackButton;
