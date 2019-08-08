import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import { TextField } from 'formik-material-ui';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

import SelectSearcher from '../../../../../../components/select-searcher.component';
import GroupsSelect from '../groups-select.component';
import './new-link.component.css';

const StyledTextField = withStyles({
  root: {
    display: 'block !important',
  },
})(TextField);

function NewLink({ isOpen, nodesIds, groups = [], saveNewLink, cancelNewLink }) {
  const initialValues = {
    label: '',
    source: undefined,
    target: undefined,
    groups: [],
  };

  const LinkSchema = Yup.object().shape({
    label: Yup.string(),
    source: Yup.string().required('Required'),
    target: Yup.string().required('Required'),
    groups: Yup.array(),
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
        render={({ errors, setFieldValue, values }) => (
          <Form>
            <DialogContent>
              <Field type="text" label="Label" name="label" component={StyledTextField} error={!!errors.label} />
              <SelectSearcher
                options={nodesIds.map((nodeId) => ({ label: nodeId, value: nodeId }))}
                onChange={({ value }) => setFieldValue('source', value)}
                label="Source"
                placeholder="Search a node"
              />
              <SelectSearcher
                options={nodesIds.map((nodeId) => ({ label: nodeId, value: nodeId }))}
                onChange={({ value }) => setFieldValue('target', value)}
                label="Target"
                placeholder="Search a node"
              />
              <GroupsSelect groups={groups} selectedGroups={values.groups} onChange={(selectedGroups) => setFieldValue('groups', selectedGroups)} />
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
