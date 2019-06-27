import React from 'react';
import styled from 'styled-components';

import SpeedDials from './speed-dials.container';
import NewNode from './scenes/new-node';
import NewLink from './scenes/new-link';
import EditNode from './scenes/edit-node';
import EditLink from './scenes/edit-link';

const StyledSpeedDials = styled(SpeedDials)`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
`;

function Actions() {
  return (
    <>
      <StyledSpeedDials />
      <NewNode />
      <NewLink />
      <EditNode />
      <EditLink />
    </>
  );
}

export default Actions;
