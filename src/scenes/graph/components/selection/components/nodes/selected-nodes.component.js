import React from 'react';
import { PropTypes } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import SelectedNode from './components';

const styles = (theme) => ({
  selectedNode: {
    marginBottom: theme.spacing(1),
  },
});

const SelectedNodes = ({ nodes = [], classes, ...props }) =>
  nodes.map((node) => <SelectedNode key={node.id} node={node} className={classes.selectedNode} {...props} />);

SelectedNodes.propTypes = {
  nodes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default withStyles(styles, { withTheme: true })(SelectedNodes);
