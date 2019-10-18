import React from 'react';
import { PropTypes } from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import { withStyles } from '@material-ui/core/styles';
import Markdown from 'react-markdown';

const styles = (theme) => ({
  chip: {
    marginRight: theme.spacing(1),
  },
});

function SelectedNode({ node, className, classes }) {
  const badges = (node.groups || []).map((group) => (
    <Chip key={group.id} label={group.name} size="small" color="secondary" className={classes.chip} />
  ));
  return (
    <Card className={className}>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          Node
        </Typography>
        <Typography component="h2" variant="h5">
          {node.id}
        </Typography>
        {badges}
        {!!node.description && <Markdown source={node.description} />}
      </CardContent>
    </Card>
  );
}

SelectedNode.propTypes = {
  node: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  className: PropTypes.string,
  classes: PropTypes.any,
};

export default withStyles(styles, { withTheme: true })(SelectedNode);
