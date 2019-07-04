import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import BackButton from './components/back-button.component';

const styles = {
  title: {
    flexGrow: 1,
  },
};

function Navbar({ title, onBack, classes, children }) {
  return (
    <AppBar>
      <Toolbar>
        {!!onBack && <BackButton onBack={onBack} />}
        <Typography className={classes.title} variant="h6" color="inherit">
          {title}
        </Typography>
        {children}
      </Toolbar>
    </AppBar>
  );
}

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  onBack: PropTypes.func,
  classes: PropTypes.any,
  children: PropTypes.any,
};

export default withStyles(styles)(Navbar);
