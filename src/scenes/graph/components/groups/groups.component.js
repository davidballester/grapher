import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';

import EmptyState from './components/empty-state.component';
import GroupListItem from './components/group-list-item.component';
import { customScroll } from '../../../../utils/styles';

const styles = (theme) => ({
  root: {
    width: '100%',
    '&.Mui-expanded': {
      margin: 0,
    },
  },
  list: {
    width: '100%',
  },
  content: {
    maxHeight: '30vh',
    ...customScroll(theme),
  },
});

function Groups({ groups = [], classes = {} }) {
  const [expanded, setExpanded] = useState(true);

  const listItems = !!groups.length && groups.map((group) => <GroupListItem key={group.id} group={group} />);
  const list = !!groups.length && <List className={classes.list}>{listItems}</List>;
  const emptyState = !groups.length && <EmptyState />;

  return (
    <>
      <ExpansionPanel className={classes.root} expanded={expanded} onChange={() => setExpanded(!expanded)}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color="textSecondary">Groups</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails classes={{ root: classes.content }}>
          {emptyState}
          {list}
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </>
  );
}

export default withStyles(styles, { withTheme: true })(Groups);
