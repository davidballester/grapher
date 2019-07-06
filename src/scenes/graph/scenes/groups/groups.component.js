import React, { useState } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import EmptyState from './components/empty-state.component';

export default function Groups({ groups = [], classes = {} }) {
  const [expanded, setExpanded] = useState(true);
  const listItems =
    !!groups.length &&
    groups.map((group) => (
      <ListItem key={group.id}>
        <ListItemText primary={group.name} />
      </ListItem>
    ));
  const emptyState = !groups.length && <EmptyState />;

  return (
    <ExpansionPanel className={classes.root} expanded={expanded} onChange={() => setExpanded(!expanded)}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography color="textSecondary">Groups</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        {emptyState}
        <List>{listItems}</List>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}
