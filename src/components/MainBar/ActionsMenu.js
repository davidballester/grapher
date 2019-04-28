import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export default function ActionsMenu({ edit, remove, ...props }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <React.Fragment>
      <IconButton color="inherit" onClick={handleClick} {...props}>
        <MoreVertIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={handleClose}>
        <MenuItem
          onClick={() => {
            edit();
            handleClose();
          }}
        >
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            remove();
            handleClose();
          }}
        >
          Delete
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
