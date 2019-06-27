import React from 'react';
import styled from 'styled-components';

import SelectedNodes from './scenes/nodes';
import SelectedLink from './scenes/links';

export const StyledSelectedLink = styled(SelectedLink)`
  margin-bottom: 1rem;
`;

export const SelectedItemsContainer = styled.div`
  position: absolute;
  left: 1rem;
  bottom: 0;
`;

function SelectedItems() {
  return (
    <SelectedItemsContainer>
      <StyledSelectedLink />
      <SelectedNodes />
    </SelectedItemsContainer>
  );
}

export default SelectedItems;
