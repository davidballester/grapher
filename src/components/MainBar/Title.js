import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

function getTitle({ pathname }, graphName) {
  if (pathname === '/') {
    return 'Grapher';
  }

  if (pathname === '/new') {
    return 'New graph';
  }

  return graphName;
}

function Title({ location, graphName }) {
  const title = getTitle(location, graphName);
  return (
    <Typography variant="h6" color="inherit">
      {title}
    </Typography>
  );
}

Title.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  graphName: PropTypes.string,
};

export default Title;
