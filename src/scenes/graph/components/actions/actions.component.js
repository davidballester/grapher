import React from 'react';

import SpeedDials from './speed-dials.container';
import NewNode from './scenes/new-node';
import NewLink from './scenes/new-link';
import EditNode from './scenes/edit-node';
import EditLink from './scenes/edit-link';

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
