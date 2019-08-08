import React from 'react';

import ConfirmDeleteNode from './scenes/node';
import ConfirmDeleteLink from './scenes/link';
import ConfirmDeleteGraph from './scenes/graph';

function ConfirmDeletes() {
  return (
    <>
      <ConfirmDeleteNode />
      <ConfirmDeleteLink />
      <ConfirmDeleteGraph />
    </>
  );
}

export default ConfirmDeletes;
