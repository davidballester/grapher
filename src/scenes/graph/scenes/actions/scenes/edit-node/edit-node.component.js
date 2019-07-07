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
import { red, purple, blue, green, yellow, orange, brown, grey } from '@material-ui/core/colors';

import ToggleColorPicker from '../../../../../../components/toggle-color-picker.component';
import GroupsSelect from '../../components/groups-select.component';

const StyledTextField = styled(TextField)`
  display: block !important;
`;

const colors = [red['A200'], purple['A200'], blue['A200'], green['A200'], yellow['A200'], orange['A200'], brown['500'], grey['500']];

function EditNode({ isOpen, node = {}, nodesIds = [], groups = [], editNode, cancelEditNode }) {
  const nodeGroups = node.groups || [];
  const oldId = node.id;
  const initialValues = {
    id: node.id,
    color: node.color,
    groups: groups.filter((group) => !!nodeGroups.find((nodeGroup) => nodeGroup.id === group.id)),
  };

  const NodeSchema = Yup.object().shape({
    id: Yup.string()
      .required('Required')
      .notOneOf(nodesIds.filter((nodeId) => nodeId !== node.id)),
    groups: Yup.array(),
  });

  return (
    <Dialog open={isOpen}>
      <DialogTitle>Edit node {node.id}</DialogTitle>
      <Formik
        initialValues={initialValues}
        validationSchema={NodeSchema}
        onSubmit={(values) => editNode(oldId, values)}
        render={({ errors, values, setFieldValue }) => (
          <Form>
            <DialogContent>
              <Field type="text" label="ID" name="id" component={StyledTextField} error={!!errors.id} />
              <ToggleColorPicker color={values.color} colors={colors} onChange={(color) => setFieldValue('color', color)} />
              <GroupsSelect groups={groups} selectedGroups={values.groups} onChange={(selectedGroups) => setFieldValue('groups', selectedGroups)} />
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

EditNode.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  node: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
  nodesIds: PropTypes.arrayOf(PropTypes.string),
  editNode: PropTypes.func.isRequired,
  cancelEditNode: PropTypes.func.isRequired,
};

export default EditNode;
