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

function isEmpty(link) {
  return !link.lable && !(link.groups || []).length && !link.description;
}

function SelectedLink({ link, className, classes }) {
  if (!link || isEmpty(link)) {
    return null;
  }

  const badges = (link.groups || []).map((group) => (
    <Chip key={group.id} label={group.name} size="small" color="secondary" className={classes.chip} />
  ));

  return (
    <Card className={className}>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          Link
        </Typography>
        <Typography component="h2" variant="h5">
          {link.label}
        </Typography>
        {badges}
        {!!link.description && <Markdown source={link.description} />}
      </CardContent>
    </Card>
  );
}

SelectedLink.propTypes = {
  link: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
  className: PropTypes.string,
};

export default withStyles(styles, { withTheme: true })(SelectedLink);
