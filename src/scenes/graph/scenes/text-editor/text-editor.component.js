import React from 'react';
import { Box } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';
import { TextField } from 'formik-material-ui';
import { Formik, Field, Form } from 'formik';
import { withStyles } from '@material-ui/core/styles';

const initialValues = {
  value: '',
};

const styles = (theme) => ({
  box: {
    padding: theme.spacing(1),
  },
});

function TextEditor({ processSubgraph, importSubgraph, error = false, processing = false, className, classes }) {
  return (
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
        <Form className={className}>
          <Box display="flex" bgcolor="background.default" className={classes.box}>
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
                }}
                margin="normal"
                fullWidth
              />
            </Box>
            <IconButton type="submit" color="primary" disabled={processing}>
              <SendIcon />
            </IconButton>
          </Box>
        </Form>
      )}
    />
  );
}

export default withStyles(styles, { withTheme: true })(TextEditor);
