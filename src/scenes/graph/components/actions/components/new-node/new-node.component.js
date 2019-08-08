import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import { TextField } from 'formik-material-ui';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

import GroupsSelect from '../groups-select.component';

const initialValues = {
  id: '',
  groups: [],
};

const NodeSchema = Yup.object().shape({
  id: Yup.string().required('Required'),
  groups: Yup.array(),
});

export default function NewNode({ isOpen, groups = [], saveNewNode, cancelNewNode }) {
  return (
    <Dialog open={isOpen}>
      <DialogTitle>New node</DialogTitle>
      <Formik
        initialValues={initialValues}
        validationSchema={NodeSchema}
        onSubmit={saveNewNode}
        render={({ errors, values, setFieldValue }) => (
          <Form>
            <DialogContent>
              <Field type="text" label="ID" name="id" component={TextField} error={!!errors.id} />
              {!!groups.length && (
                <GroupsSelect groups={groups} selectedGroups={values.groups} onChange={(selectedGroups) => setFieldValue('groups', selectedGroups)} />
              )}
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
