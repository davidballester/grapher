import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { ROUTES } from '../../constants';

function BackButton({ location, ...props }) {
  const { pathname } = location;
  if (pathname === ROUTES.BASE || pathname === ROUTES.GRAPHS) {
    return null;
  }
  return (
    <IconButton component={Link} to={ROUTES.BASE} color="inherit" {...props}>
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
