import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const Title = ({ children, onClose, classes }) => (
  <DialogTitle disableTypography className={classes.root}>
    <Typography variant="h6">{children}</Typography>
    <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
      <CloseIcon />
    </IconButton>
  </DialogTitle>
);

export default withStyles(styles, { withTheme: true })(Title);
