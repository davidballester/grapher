import React, { useState } from 'react';
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

export default function Groups({ groups = [], classes = {}, addGroup, removeGroup }) {
  const [expanded, setExpanded] = useState(true);
  const [groupEditOpen, setGroupEditOpen] = useState(false);
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
      />
    ));
  const list = !!groups.length && (
    <List>
      {listItems}
      <AddGroupListItem onClick={() => setGroupEditOpen(true)} />
    </List>
  );
  const emptyState = !groups.length && <EmptyState addGroup={() => setGroupEditOpen(true)} />;

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
        isOpen={groupEditOpen}
        cancel={() => setGroupEditOpen(false)}
        save={(group) => {
          addGroup(group);
          setGroupEditOpen(false);
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
