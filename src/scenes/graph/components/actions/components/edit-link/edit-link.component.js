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
import { withStyles } from '@material-ui/core/styles';
import AceEditor from 'react-ace';
import Box from '@material-ui/core/Box';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';

import 'brace/mode/markdown';
import 'brace/theme/monokai';

import GroupsSelect from '../groups-select.component';

const styles = (theme) => ({
  label: {
    marginBottom: theme.spacing(1),
  },
  content: {
    overflow: 'scroll',
    maxHeight: '60vh',
    minHeight: '200px',
  },
  groups: {
    marginTop: theme.spacing(3),
  },
});

function EditLink({ isOpen, link = {}, groups = [], editLink, cancelEditLink, classes }) {
  const linkGroups = link.groups || [];
  const initialValues = {
    label: link.label,
    description: link.description,
    groups: groups.filter((group) => !!linkGroups.find((linkGroup) => linkGroup.id === group.id)),
  };

  const LinkSchema = Yup.object().shape({
    label: Yup.string().required('Required'),
    description: Yup.string(),
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
            <DialogContent className={classes.content}>
              <Field type="text" label="Label" name="label" component={TextField} error={!!errors.label} />
              {!!groups.length && (
                <GroupsSelect
                  className={classes.groups}
                  groups={groups}
                  selectedGroups={values.groups}
                  onChange={(selectedGroups) => setFieldValue('groups', selectedGroups)}
                />
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

export default withStyles(styles, { withTheme: true })(EditLink);
