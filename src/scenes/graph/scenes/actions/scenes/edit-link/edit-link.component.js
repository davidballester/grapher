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

function EditLink({ isOpen, link = {}, editLink, cancelEditLink }) {
  const initialValues = {
    label: link.label,
  };

  const LinkSchema = Yup.object().shape({
    label: Yup.string().required('Required'),
  });

  return (
    <Dialog open={isOpen}>
      <DialogTitle>Edit link {link.label}</DialogTitle>
      <Formik
        initialValues={initialValues}
        validationSchema={LinkSchema}
        onSubmit={(values) => editLink({ ...link, ...values })}
        render={({ errors }) => (
          <Form>
            <DialogContent>
              <Field type="text" label="Label" name="label" component={StyledTextField} error={!!errors.label} />
            </DialogContent>
            <DialogActions>
              <Button onClick={cancelEditLink} className="cancel" type="button">
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

EditLink.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  link: PropTypes.shape({
    label: PropTypes.string.isRequired,
  }),
  editLink: PropTypes.func.isRequired,
  cancelEditLink: PropTypes.func.isRequired,
};

export default EditLink;
