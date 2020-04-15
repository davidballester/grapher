import React from 'react';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  cardMedia: {
    height: 140,
    position: 'relative',
    background: theme.palette.primary.light,
    color: theme.palette.text.primary,
  },
  addIconContainer: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
  },
  addIcon: {
    position: 'relative',
    margin: 'auto',
    fontSize: theme.typography.h3.fontSize,
  },
});

function NewGraphCard({ onClick, classes }) {
  return (
    <Card>
      <CardActionArea onClick={onClick}>
        <CardMedia title="Dmmy new graph uimage" className={classes.cardMedia}>
          <div className={classes.addIconContainer}>
            <AddIcon className={classes.addIcon} />
          </div>
        </CardMedia>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            New graph
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={onClick}>
          Create
        </Button>
      </CardActions>
    </Card>
  );
}

export default withStyles(styles, { withTheme: true })(NewGraphCard);
