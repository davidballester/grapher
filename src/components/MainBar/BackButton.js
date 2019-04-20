import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

function BackButton({ location, ...props }) {
  const { pathname } = location;
  if (pathname === '/') {
    return null;
  }
  return (
    <IconButton component={Link} to="/" color="inherit" {...props}>
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
