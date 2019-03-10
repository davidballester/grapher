import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import { TextField } from 'formik-material-ui';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

const initialValues = {
  id: '',
};

const NodeSchema = Yup.object().shape({
  id: Yup.string().required('Required'),
});

export default function NewNode({ isOpen, saveNewNode, cancelNewNode }) {
  return (
    <Dialog open={isOpen}>
      <DialogTitle>New node</DialogTitle>
      <Formik
        initialValues={initialValues}
        validationSchema={NodeSchema}
        onSubmit={saveNewNode}
        render={({ errors }) => (
          <Form>
            <DialogContent>
              <Field type="text" label="ID" name="id" component={TextField} error={!!errors.id} />
            </DialogContent>
            <DialogActions>
              <Button onClick={cancelNewNode} className="cancel" type="button">
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
