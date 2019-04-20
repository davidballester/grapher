import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

function EditButton({ graphName, ...props }) {
  if (!graphName) {
    return null;
  }
  return (
    <IconButton color="inherit" {...props}>
      <EditIcon />
    </IconButton>
  );
}

EditButton.propTypes = {
  graphName: PropTypes.string,
};

export default EditButton;
