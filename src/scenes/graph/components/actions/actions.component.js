import React from 'react';

import SpeedDials from './speed-dials.container';
import NewNode from './components/new-node';
import NewLink from './components/new-link';
import EditNode from './components/edit-node';
import EditLink from './components/edit-link';

function Actions({ className }) {
  return (
    <>
      <SpeedDials className={className} />
      <NewNode />
      <NewLink />
      <EditNode />
      <EditLink />
    </>
  );
}

export default Actions;
