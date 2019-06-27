import React from 'react';
import { PropTypes } from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

function SelectedNode({ node, openConfirmDeleteNode, className, openEditNode }) {
  return (
    <Card className={className}>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          Node
        </Typography>
        <Typography component="h2" variant="h5">
          {node.id}
        </Typography>
      </CardContent>
      <CardActions>
        <Button className="delete" size="small" onClick={() => openConfirmDeleteNode([node.id])}>
          Delete
        </Button>
        <Button className="edit" size="small" onClick={() => openEditNode(node)}>
          Edit
        </Button>
      </CardActions>
    </Card>
  );
}

SelectedNode.propTypes = {
  node: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  openConfirmDeleteNode: PropTypes.func.isRequired,
  className: PropTypes.string,
  openEditNode: PropTypes.func.isRequired,
};

export default SelectedNode;
