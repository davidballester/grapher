import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';

import EmptyState from './components/empty-state.component';
import GroupEdit from './components/group-edit.component';
import GroupListItem from './components/group-list-item.component';
import AddGroupListItem from './components/add-group-list-item.component';
import ConfirmDelete from './components/confirm-delete.component';

const styles = {
  root: {
    width: '100%',
  },
  list: {
    width: '100%',
  },
};

function Groups({ groups = [], classes = {}, addGroup, removeGroup, updateGroup }) {
  const [expanded, setExpanded] = useState(true);
  const [groupEdit, setGroupEdit] = useState({
    open: false,
    group: undefined,
  });
  const [confirmDelete, setConfirmDelete] = useState({
    open: false,
    group: undefined,
  });

  const listItems =
    !!groups.length &&
    groups.map((group) => (
      <GroupListItem
        key={group.id}
        group={group}
        onDelete={() =>
          setConfirmDelete({
            open: true,
            group,
          })
        }
        onEdit={() => {
          setGroupEdit({
            open: true,
            group,
          });
        }}
      />
    ));
  const list = !!groups.length && (
    <List className={classes.list}>
      {listItems}
      <AddGroupListItem
        onClick={() =>
          setGroupEdit({
            open: true,
            group: undefined,
          })
        }
      />
    </List>
  );
  const emptyState = !groups.length && (
    <EmptyState
      addGroup={() =>
        setGroupEdit({
          open: true,
          group: undefined,
        })
      }
    />
  );

  return (
    <>
      <ExpansionPanel className={classes.root} expanded={expanded} onChange={() => setExpanded(!expanded)}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color="textSecondary">Groups</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          {emptyState}
          {list}
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <GroupEdit
        isOpen={groupEdit.open}
        group={groupEdit.group}
        cancel={() =>
          setGroupEdit({
            open: false,
            group: undefined,
          })
        }
        save={(group) => {
          if (!group.id) {
            addGroup(group);
          } else {
            updateGroup(group);
          }
          setGroupEdit({
            open: false,
            group: undefined,
          });
        }}
      />
      <ConfirmDelete
        open={confirmDelete.open}
        groupName={!!confirmDelete.group ? confirmDelete.group.name : ''}
        cancel={() => setConfirmDelete({ open: false, group: undefined })}
        confirm={() => {
          removeGroup(confirmDelete.group.id);
          setConfirmDelete({ open: false, group: undefined });
        }}
      />
    </>
  );
}

export default withStyles(styles)(Groups);
