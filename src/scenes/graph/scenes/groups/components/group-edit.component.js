import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import { TextField } from 'formik-material-ui';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { red, purple, blue, green, yellow, orange, brown, grey } from '@material-ui/core/colors';

import ToggleColorPicker from '../../../../../components/toggle-color-picker.component';

const colors = [red['A700'], purple['A700'], blue['A700'], green['A700'], yellow['A700'], orange['A700'], brown['A700'], grey['A700']];

const GroupSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  color: Yup.string().required('Required'),
});

const classes = {
  root: {
    display: 'block',
  },
};

const StyledTextField = withStyles(classes)(TextField);

export default function GroupEdit({ isOpen, group = {}, save, cancel }) {
  const initialValues = {
    name: '',
    color: colors[0],
    ...group,
  };

  const title = !!group.id ? `Edit group ${group.name}` : 'New group';

  return (
    <Dialog open={isOpen}>
      <DialogTitle>{title}</DialogTitle>
      <Formik
        initialValues={initialValues}
        validationSchema={GroupSchema}
        onSubmit={save}
        render={({ errors, values, setFieldValue }) => (
          <Form>
            <DialogContent>
              <Field type="text" label="Name" name="name" component={StyledTextField} error={!!errors.name} />
              <ToggleColorPicker color={values.color} colors={colors} onChange={(color) => setFieldValue('color', color)} />
            </DialogContent>
            <DialogActions>
              <Button onClick={cancel} className="cancel" type="button">
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
