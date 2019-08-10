import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TwitterPicker } from 'react-color';
import TextField from '@material-ui/core/TextField';

function ToggleColorPicker({ color, colors, onChange, fullWidth = false }) {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  return (
    <React.Fragment>
      <TextField label="Color" value={color} margin="normal" onFocus={() => setDisplayColorPicker(true)} fullWidth={fullWidth} />
      {displayColorPicker && <TwitterPicker width={170} color={color} onChange={({ hex: color }) => onChange(color)} colors={colors} />}
    </React.Fragment>
  );
}

ToggleColorPicker.propTypes = {
  color: PropTypes.string,
  colors: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func.isRequired,
};

export default ToggleColorPicker;
