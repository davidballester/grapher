import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import BrightnessIcon1 from '@material-ui/icons/Brightness1';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import RefreshIcon from '@material-ui/icons/Refresh';

function SpeedDials({ openNewNode, openNewLink, refresh, ...props }) {
  const [open, setOpen] = useState(false);
  return (
    <SpeedDial
      ariaLabel="Actions"
      open={open}
      icon={<SpeedDialIcon />}
      onClick={() => setOpen(!open)}
      onClose={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      direction="up"
      {...props}
    >
      <SpeedDialAction key="add-node" icon={<BrightnessIcon1 />} tooltipTitle={'Add node'} onClick={openNewNode} tooltipOpen />
      <SpeedDialAction key="add-link" icon={<ArrowRightAltIcon />} tooltipTitle={'Add link'} onClick={openNewLink} tooltipOpen />
      <SpeedDialAction key="refresh" icon={<RefreshIcon />} tooltipTitle={'Refresh'} onClick={refresh} tooltipOpen />
    </SpeedDial>
  );
}

SpeedDials.propTypes = {
  openNewNode: PropTypes.func.isRequired,
  openNewLink: PropTypes.func.isRequired,
  refresh: PropTypes.func.isRequired,
};

export default SpeedDials;
