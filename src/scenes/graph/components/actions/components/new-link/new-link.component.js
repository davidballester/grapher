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
import AceEditor from 'react-ace';
import Box from '@material-ui/core/Box';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';

import 'brace/mode/markdown';
import 'brace/theme/monokai';

import SelectSearcher from '../../../../../../components/select-searcher.component';
import GroupsSelect from '../groups-select.component';
import './new-link.component.css';

const styles = (theme) => ({
  label: {
    marginBottom: theme.spacing(1),
  },
  content: {
    overflow: 'scroll',
    maxHeight: '60vh',
    minHeight: '200px',
  },
  fields: {
    marginTop: theme.spacing(4),
  },
});

const StyledTextField = withStyles({
  root: {
    display: 'block !important',
  },
})(TextField);

function NewLink({ isOpen, nodesIds, groups = [], saveNewLink, cancelNewLink, classes }) {
  const initialValues = {
    label: '',
    source: undefined,
    target: undefined,
    description: '',
    groups: [],
  };

  const LinkSchema = Yup.object().shape({
    label: Yup.string(),
    source: Yup.string().required('Required'),
    target: Yup.string().required('Required'),
    description: Yup.string(),
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
            <DialogContent className={classes.content}>
              <Field type="text" label="Label" name="label" component={StyledTextField} error={!!errors.label} />
              <SelectSearcher
                className={classes.fields}
                options={nodesIds.map((nodeId) => ({ label: nodeId, value: nodeId }))}
                onChange={({ value }) => setFieldValue('source', value)}
                label="Source"
                placeholder="Search a node"
              />
              <SelectSearcher
                className={classes.fields}
                options={nodesIds.map((nodeId) => ({ label: nodeId, value: nodeId }))}
                onChange={({ value }) => setFieldValue('target', value)}
                label="Target"
                placeholder="Search a node"
              />
              {!!groups.length && (
                <GroupsSelect groups={groups} selectedGroups={values.groups} onChange={(selectedGroups) => setFieldValue('groups', selectedGroups)} />
              )}
              <Box marginTop={4}>
                <InputLabel htmlFor="description" className={classes.label}>
                  Description
                </InputLabel>
                <AceEditor
                  id="description"
                  width="100%"
                  minLines={10}
                  maxLines={10}
                  placeholder=""
                  mode="markdown"
                  theme="monokai"
                  fontSize={14}
                  showPrintMargin={false}
                  showGutter={true}
                  highlightActiveLine={true}
                  value={values.description}
                  setOptions={{
                    enableBasicAutocompletion: false,
                    enableLiveAutocompletion: false,
                    enableSnippets: false,
                    showLineNumbers: true,
                    tabSize: 2,
                  }}
                  onChange={(description) => setFieldValue('description', description)}
                />
                <Typography variant="body2" color="inherit">
                  Use{' '}
                  <a href="https://en.wikipedia.org/wiki/Markdown" target="_blank" rel="noopener noreferrer">
                    markdown
                  </a>
                  to add a description to the link
                </Typography>
              </Box>
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

export default withStyles(styles, { withTheme: true })(NewLink);
