import React from 'react';
import { PropTypes } from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

function SelectedLink({ link, openConfirmDeleteLink, openEditLink, className }) {
  if (!link) {
    return null;
  }

  return (
    <Card className={className}>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          Link
        </Typography>
        <Typography component="h2" variant="h5">
          {link.label}
        </Typography>
      </CardContent>
      <CardActions>
        <Button className="delete" size="small" onClick={() => openConfirmDeleteLink(link.id)}>
          Delete
        </Button>
        <Button className="edit" size="small" onClick={() => openEditLink(link)}>
          Edit
        </Button>
      </CardActions>
    </Card>
  );
}

SelectedLink.propTypes = {
  link: PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }),
  openConfirmDeleteLink: PropTypes.func.isRequired,
  openEditLink: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default SelectedLink;
