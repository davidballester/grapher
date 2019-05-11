import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import { TextField } from 'formik-material-ui';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

const StyledTextField = styled(TextField)`
  display: block !important;
`;

function NewLink({ isOpen, link = {}, saveNewLink, cancelNewLink }) {
  const initialValues = {
    label: link.label,
  };

  const LinkSchema = Yup.object().shape({
    label: Yup.string().required('Required'),
  });

  return (
    <Dialog open={isOpen}>
      <DialogTitle>New link</DialogTitle>
      <Formik
        initialValues={initialValues}
        validationSchema={LinkSchema}
        onSubmit={(values) => saveNewLink({ ...link, ...values })}
        render={({ errors }) => (
          <Form>
            <DialogContent>
              <Field type="text" label="Label" name="label" component={StyledTextField} error={!!errors.label} />
            </DialogContent>
            <DialogActions>
              <Button onClick={cancelNewLink} className="cancel" type="button">
                Cancel
              </Button>
              <Button color="primary" type="submit">
                Done
              </Button>
            </DialogActions>
          </Form>
        )}
      />
    </Dialog>
  );
}

NewLink.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  link: PropTypes.shape({
    label: PropTypes.string.isRequired,
  }),
  saveNewLink: PropTypes.func.isRequired,
  cancelNewLink: PropTypes.func.isRequired,
};

export default NewLink;
