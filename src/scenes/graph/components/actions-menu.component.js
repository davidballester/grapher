import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import GetAppIcon from '@material-ui/icons/GetApp';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  moreButton: {
    marginRight: -theme.spacing(2),
  },
});

function ActionsMenu({ graphName, openEditGraph, openConfirmDeleteGraph, openExport, classes, ...props }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <React.Fragment>
      <IconButton color="inherit" onClick={handleClick} className={classes.moreButton} {...props}>
        <MoreVertIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={handleClose}>
        <MenuItem
          onClick={() => {
            openEditGraph();
            handleClose();
          }}
        >
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          Edit
        </MenuItem>

        <MenuItem
          onClick={() => {
            openExport();
            handleClose();
          }}
        >
          <ListItemIcon>
            <GetAppIcon />
          </ListItemIcon>
          Export
        </MenuItem>

        <MenuItem
          onClick={() => {
            openConfirmDeleteGraph(graphName);
            handleClose();
          }}
        >
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          Delete
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}

export default withStyles(styles, { withTheme: true })(ActionsMenu);
