import React, { forwardRef } from 'react';

import { Link as RouterLink } from 'react-router-dom';
import Popover from '@material-ui/core/Popover';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import { useTheme } from '@material-ui/core/styles';

import { ROUTES } from '../../constants';

export default function LoggedInMenu({ imageUrl, name, anchorEl, handleClose, unsetAuth }) {
  const theme = useTheme();
  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={!!anchorEl}
      onClose={handleClose}
    >
      <Box textAlign="center" padding={4} paddingBottom={2} display="flex" justifyContent="center" flexDirection="column" alignItems="center">
        <Avatar src={imageUrl} style={{ width: 70, height: 70, marginBottom: theme.spacing(2) }} />
        <Typography component="h2" variant="h6">
          {name}
        </Typography>
      </Box>
      <Divider />
      <Box textAlign="center" padding={2}>
        <Button
          variant="outlined"
          onClick={() => {
            unsetAuth();
            handleClose();
          }}
        >
          Sign out
        </Button>
      </Box>
      <Divider />
      <Box textAlign="center" padding={2}>
        <Link
          variant="body2"
          component={forwardRef((props, ref) => (
            <RouterLink to={ROUTES.PRIVACY_POLICY} {...props} ref={ref} />
          ))}
          style={{ margin: theme.spacing(1) }}
        >
          Privacy policy
        </Link>
      </Box>
    </Popover>
  );
}
