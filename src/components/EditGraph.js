import React from 'react';

import NewNode from '../containers/NewNode';
import ConfirmDeleteNode from '../containers/ConfirmDeleteNode';
import ConfirmDeleteLink from '../containers/ConfirmDeleteLink';
import SelectedItems from './SelectedItems';
import EditNode from '../containers/EditNode';

export default function EditGraph() {
  return (
    <React.Fragment>
      <NewNode />
      <ConfirmDeleteNode />
      <ConfirmDeleteLink />
      <SelectedItems />
      <EditNode />
    </React.Fragment>
  );
}
