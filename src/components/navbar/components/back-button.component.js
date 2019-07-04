import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const styles = (theme) => ({
  root: {
    marginLeft: -theme.spacing(2),
    marginRight: theme.spacing(3),
  },
});

function BackButton({ onBack, classes, className, ...props }) {
  return (
    <IconButton color="inherit" className={clsx(classes.root, className)} {...props} onClick={onBack}>
      <ArrowBackIcon />
    </IconButton>
  );
}

BackButton.propTypes = {
  onBack: PropTypes.func.isRequired,
  classes: PropTypes.any,
  className: PropTypes.string,
};

export default withStyles(styles, { withTheme: true })(BackButton);
