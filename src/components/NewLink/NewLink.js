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

import NodeSearcher from './NodeSearcher';
import './NewLink.css';

const StyledTextField = styled(TextField)`
  display: block !important;
`;

const StyledNodeSearcher = styled(NodeSearcher)`
  margin-top: 1rem;
`;

function NewLink({ isOpen, nodesIds, saveNewLink, cancelNewLink }) {
  const initialValues = {
    label: '',
    source: undefined,
    target: undefined,
  };

  const LinkSchema = Yup.object().shape({
    label: Yup.string(),
    source: Yup.string().required('Required'),
    target: Yup.string().required('Required'),
  });

  return (
    <Dialog open={isOpen}>
      <DialogTitle>New link</DialogTitle>
      <Formik
        initialValues={initialValues}
        validationSchema={LinkSchema}
        onSubmit={(values) =>
          saveNewLink({
            ...values,
            label: values.label.trim() !== '' ? values.label : `${values.source}-${values.target}`,
          })
        }
        render={({ errors, setFieldValue }) => (
          <Form>
            <DialogContent>
              <Field type="text" label="Label" name="label" component={StyledTextField} error={!!errors.label} />
              <StyledNodeSearcher nodesIds={nodesIds} onChange={(source) => setFieldValue('source', source)} label="Source" />
              <StyledNodeSearcher nodesIds={nodesIds} onChange={(target) => setFieldValue('target', target)} label="Target" />
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
  saveNewLink: PropTypes.func.isRequired,
  cancelNewLink: PropTypes.func.isRequired,
  nodesIds: PropTypes.arrayOf(PropTypes.string),
};

export default NewLink;
