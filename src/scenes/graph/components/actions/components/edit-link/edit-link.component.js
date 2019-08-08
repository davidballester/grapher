import React from 'react';
import PropTypes from 'prop-types';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import { TextField } from 'formik-material-ui';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

import GroupsSelect from '../groups-select.component';

function EditLink({ isOpen, link = {}, groups = [], editLink, cancelEditLink }) {
  const linkGroups = link.groups || [];
  const initialValues = {
    label: link.label,
    groups: groups.filter((group) => !!linkGroups.find((linkGroup) => linkGroup.id === group.id)),
  };

  const LinkSchema = Yup.object().shape({
    label: Yup.string().required('Required'),
    groups: Yup.array(),
  });

  return (
    <Dialog open={isOpen}>
      <DialogTitle>Edit link {link.label}</DialogTitle>
      <Formik
        initialValues={initialValues}
        validationSchema={LinkSchema}
        onSubmit={(values) => editLink({ ...link, ...values })}
        render={({ errors, values, setFieldValue }) => (
          <Form>
            <DialogContent>
              <Field type="text" label="Label" name="label" component={TextField} error={!!errors.label} />
              {!!groups.length && (
                <GroupsSelect groups={groups} selectedGroups={values.groups} onChange={(selectedGroups) => setFieldValue('groups', selectedGroups)} />
              )}
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
