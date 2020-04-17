import React from 'react';
import PropTypes from 'prop-types';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import { TextField } from 'formik-material-ui';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

import CustomDialog from '../../../../components/CustomDialog';

function EditGraph({ isOpen, graphId, graphName, setGraphName, cancelEditGraph }) {
  const initialValues = {
    graphName,
  };

  const GraphSchema = Yup.object().shape({
    graphName: Yup.string().required('Required'),
  });

  return (
    <CustomDialog open={isOpen}>
      <DialogTitle>Edit graph {graphName}</DialogTitle>
      <Formik
        initialValues={initialValues}
        validationSchema={GraphSchema}
        onSubmit={(values) => setGraphName(graphId, values.graphName)}
        render={({ errors }) => (
          <Form>
            <DialogContent>
              <Field type="text" label="Name" name="graphName" component={TextField} error={!!errors.name} />
            </DialogContent>
            <DialogActions>
              <Button onClick={cancelEditGraph} className="cancel" type="button">
                Cancel
              </Button>
              <Button color="primary" type="submit">
                Done
              </Button>
            </DialogActions>
          </Form>
        )}
      />
    </CustomDialog>
  );
}

EditGraph.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  graphName: PropTypes.string,
  graphId: PropTypes.string.isRequired,
  setGraphName: PropTypes.func.isRequired,
  cancelEditGraph: PropTypes.func.isRequired,
};

export default EditGraph;
