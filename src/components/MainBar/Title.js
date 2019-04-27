import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

import { ROUTES } from '../../constants';

function getTitle({ pathname }, graphName) {
  if (pathname === ROUTES.BASE || pathname === ROUTES.GRAPHS) {
    return 'Grapher';
  }

  if (pathname === ROUTES.NEW_GRAPH) {
    return 'New graph';
  }

  return graphName;
}

function Title({ location, graphName, ...props }) {
  const title = getTitle(location, graphName);
  return (
    <Typography variant="h6" color="inherit" {...props}>
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
