import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import { TextField } from 'formik-material-ui';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

const NodeSchema = Yup.object().shape({
  id: Yup.string().required('Required'),
});

export default function EditNode({ isOpen, node = {}, editNode, cancelEditNode }) {
  const initialValues = {
    id: node.id,
  };

  return (
    <Dialog open={isOpen}>
      <DialogTitle>Edit node {node.id}</DialogTitle>
      <Formik
        initialValues={initialValues}
        validationSchema={NodeSchema}
        onSubmit={editNode}
        render={({ errors }) => (
          <Form>
            <DialogContent>
              <Field type="text" label="ID" name="id" component={TextField} error={!!errors.id} />
            </DialogContent>
            <DialogActions>
              <Button onClick={cancelEditNode} className="cancel" type="button">
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
