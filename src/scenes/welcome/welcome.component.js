import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { withStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import NewGraphDialog from './new-graph';
import GraphCard from './graph-card';
import NewGraphCard from './new-graph-card';
import Import from './graph-import';
import Authentication from './authentication';

const styles = (theme) => ({
  main: {
    marginTop: theme.spacing(10),
  },
  text: {
    marginTop: theme.spacing(3),
  },
  rightAppBarContent: {
    marginRight: theme.spacing(2),
  },
  buttonContainer: {
    textAlign: 'center',
    margin: theme.spacing(3),
  },
  button: {
    display: 'block',
    margin: 'auto',
    marginBottom: theme.spacing(1),
  },
});

function Welcome({ openNewGraph, openGraph, graphNames, openImportGraph, classes }) {
  const theme = useTheme();
  const bigScreen = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <>
      <AppBar position="sticky">
        <Toolbar disableGutters>
          <div style={{ flex: 1 }} />
          <div className={classes.rightAppBarContent}>
            <Authentication />
          </div>
        </Toolbar>
      </AppBar>
      <Container>
        <Typography variant="h3" component="h1" align="center" className={classes.main}>
          Welcome to Grapher
        </Typography>
        <Typography component="p" variant="body1" align="center" className={classes.text}>
          Write graphs down using a simple notation. Group together nodes and links and color groups to reveal patterns. Save your graphs in your
          browser or exporte them in JSON format so you can import them into a different browser.
        </Typography>
        <div className={classes.buttonContainer}>
          <Button variant="contained" color="primary" onClick={openNewGraph} className={classes.button}>
            Get started
          </Button>
          <Button color="primary" onClick={openImportGraph} className={classes.button}>
            Import graph
          </Button>
        </div>
        <GridList cellHeight={320} cols={bigScreen ? 3 : 2} className={classes.graphList}>
          {graphNames.map(([graphId, graphName]) => (
            <GridListTile key={graphId} cols={1}>
              <GraphCard graphId={graphId} graphName={graphName} onOpen={() => openGraph(graphId)} />
            </GridListTile>
          ))}
          <GridListTile key="new" cols={1}>
            <NewGraphCard onClick={openNewGraph} />
          </GridListTile>
        </GridList>
      </Container>
      <NewGraphDialog />
      <Import />
    </>
  );
}

export default withStyles(styles, { withTheme: true })(Welcome);
