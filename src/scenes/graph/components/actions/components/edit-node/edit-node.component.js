import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import { TextField } from 'formik-material-ui';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { red, purple, blue, green, yellow, orange, brown, grey } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import AceEditor from 'react-ace';
import Box from '@material-ui/core/Box';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';

import 'brace/mode/markdown';
import 'brace/theme/monokai';

import ToggleColorPicker from '../../../../../../components/toggle-color-picker.component';
import GroupsSelect from '../groups-select.component';

const styles = (theme) => ({
  label: {
    marginBottom: theme.spacing(1),
  },
  content: {
    overflow: 'auto',
    maxHeight: '60vh',
    minHeight: '200px',
  },
  groups: {
    marginTop: theme.spacing(3),
  },
});

const StyledTextField = withStyles({
  root: {
    display: 'block',
  },
})(TextField);

const colors = [red['A200'], purple['A200'], blue['A200'], green['A200'], yellow['A200'], orange['A200'], brown['500'], grey['500']];

function EditNode({ isOpen, title, node = {}, nodesIds = [], groups = [], save, cancel, classes }) {
  const nodeGroups = node.groups || [];
  const oldId = node.id;
  const initialValues = {
    id: node.id,
    color: node.color,
    description: node.description,
    groups: groups.filter((group) => !!nodeGroups.find((nodeGroup) => nodeGroup.id === group.id)),
  };

  const NodeSchema = Yup.object().shape({
    id: Yup.string()
      .required('Required')
      .notOneOf(nodesIds.filter((nodeId) => nodeId !== node.id)),
    description: Yup.string(),
    groups: Yup.array(),
  });

  return (
    <Dialog open={isOpen}>
      <DialogTitle>{title}</DialogTitle>
      <Formik
        initialValues={initialValues}
        validationSchema={NodeSchema}
        onSubmit={(values) => save(oldId, values)}
        render={({ errors, values, setFieldValue }) => (
          <Form>
            <DialogContent className={classes.content}>
              <Field type="text" label="ID" name="id" component={StyledTextField} error={!!errors.id} fullWidth />
              <ToggleColorPicker color={values.color} colors={colors} onChange={(color) => setFieldValue('color', color)} fullWidth />
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
                  to add a description for the node
                </Typography>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={cancel} className="cancel" type="button">
                Cancel
              </Button>
              <Button color="primary" type="submit">
                Save
              </Button>
            </DialogActions>
          </Form>
        )}
      />
    </Dialog>
  );
}

export default withStyles(styles, { withTheme: true })(EditNode);
