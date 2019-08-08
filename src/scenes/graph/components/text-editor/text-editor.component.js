import React from 'react';
import { Box } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { TextField } from 'formik-material-ui';
import { Formik, Field, Form } from 'formik';
import { withStyles, fade } from '@material-ui/core/styles';
import clsx from 'clsx';

const initialValues = {
  value: '',
};

const styles = (theme) => ({
  container: {
    flexGrow: 1,
  },
  form: {
    flexGrow: 1,
    padding: theme.spacing(1),
    margin: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    '&:hover,&:focus,&:active': {
      backgroundColor: fade(theme.palette.primary.light, 0.15),
    },
  },
  fieldUnderline: {
    '&:before,&:after': {
      borderBottomColor: 'transparent !important',
    },
    '&.Mui-error:after': {
      borderBottomColor: `${theme.palette.error.main} !important`,
    },
  },
  send: {
    padding: 0,
  },
});

function TextEditor({ processSubgraph, importSubgraph, error = false, processing = false, className, classes }) {
  return (
    <div className={clsx(classes.container, className)}>
      <AppBar position="static" color="default">
        <Toolbar variant="dense">
          <Formik
            initialValues={initialValues}
            onSubmit={({ value }, { resetForm, setSubmitting }) => {
              if (!error) {
                importSubgraph(value);
                resetForm(initialValues);
              }
              setSubmitting(false);
            }}
            render={({ handleChange }) => (
              <Form className={classes.form}>
                <Box display="flex">
                  <Box flexGrow={1}>
                    <Field
                      type="text"
                      name="value"
                      component={TextField}
                      InputProps={{
                        onChange: (event) => {
                          processSubgraph(event.target.value);
                          handleChange(event);
                        },
                        error,
                        placeholder: 'Graph path',
                        margin: 'none',
                        classes: {
                          underline: classes.fieldUnderline,
                        },
                      }}
                      margin="none"
                      fullWidth
                    />
                  </Box>
                  <IconButton type="submit" color="primary" disabled={processing} className={classes.send}>
                    <SendIcon />
                  </IconButton>
                </Box>
              </Form>
            )}
          />
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withStyles(styles, { withTheme: true })(TextEditor);
