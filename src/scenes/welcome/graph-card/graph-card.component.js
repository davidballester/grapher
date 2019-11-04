import React from 'react';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import useImage from '../images';
import ImageBadge from '../image-badge';

const styles = (theme) => ({
  cardMedia: {
    height: 140,
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    bottom: theme.spacing(1),
    right: theme.spacing(1),
    opacity: 0.6,
  },
});

function GraphCard({ graphId, graphName, onOpen, classes }) {
  const image = useImage(graphId);
  return (
    <Card>
      <CardActionArea onClick={onOpen}>
        <CardMedia image={image.source} title="Dummy graph image" className={classes.cardMedia}>
          <ImageBadge name={image.name} username={image.username} className={classes.badge} />
        </CardMedia>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {graphName}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={onOpen}>
          Open
        </Button>
      </CardActions>
    </Card>
  );
}

export default withStyles(styles, { withTheme: true })(GraphCard);
