import React from 'react';
import styled from 'styled-components';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import Title from './Title';
import BackButton from './BackButton';

const StyledAppBar = styled(AppBar)`
  flex-grow: 1;
`;

const StyledBackButton = styled(BackButton)`
  && {
    margin-left: -12px;
    margin-right: 20px;
  }
`;

const StyledTitle = styled(Title)`
  flex-grow: 1;
`;

export default function MainBar({ graphName, location }) {
  return (
    <StyledAppBar position="static">
      <Toolbar>
        <StyledBackButton location={location} />
        <StyledTitle location={location} graphName={graphName} />
      </Toolbar>
    </StyledAppBar>
  );
}