import React from 'react';
import styled from 'styled-components';

import SelectedNodes from '../containers/SelectedNodes';
import SelectedLink from '../containers/SelectedLink';

export const StyledSelectedLink = styled(SelectedLink)`
  margin-bottom: 1rem;
`;

export const SelectedItemsContainer = styled.div`
  position: absolute;
  right: 1rem;
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
