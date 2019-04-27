import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

function EditButton({ graphName, openEditGraph, ...props }) {
  if (!graphName) {
    return null;
  }
  return (
    <IconButton color="inherit" onClick={openEditGraph} {...props}>
      <EditIcon />
    </IconButton>
  );
}

EditButton.propTypes = {
  graphName: PropTypes.string,
};

export default EditButton;
