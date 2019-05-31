import React from 'react';
import styled from 'styled-components';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import Title from './Title';
import BackButton from './BackButton';
import ActionsMenu from './ActionsMenu';

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

const StyledActionsMenu = styled(ActionsMenu)`
  && {
    margin-right: -12px;
  }
`;

export default function MainBar({ graphName, location, openEditGraph, openConfirmDeleteGraph, openExport }) {
  return (
    <StyledAppBar position="static">
      <Toolbar>
        <StyledBackButton location={location} />
        <StyledTitle location={location} graphName={graphName} />
        <StyledActionsMenu edit={openEditGraph} remove={() => openConfirmDeleteGraph(graphName)} openExport={openExport} />
      </Toolbar>
    </StyledAppBar>
  );
}
