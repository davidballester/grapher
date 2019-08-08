import React from 'react';

import ConfirmDeleteNode from './components/node';
import ConfirmDeleteLink from './components/link';
import ConfirmDeleteGraph from './components/graph';

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
