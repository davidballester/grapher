import React, { useState } from 'react';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  selectFormControl: {
    display: 'block',
  },
  select: {
    width: '100%',
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function GroupsSelect({ groups, selectedGroups, onChange, className }) {
  const classes = useStyles();
  const [openSelect, setOpenSelect] = useState(false);
  return (
    <FormControl className={clsx(className, classes.selectFormControl)}>
      <InputLabel htmlFor="groups">Groups</InputLabel>
      <Select
        open={openSelect}
        multiple
        value={selectedGroups}
        onChange={(event) => {
          onChange(event.target.value);
          setOpenSelect(false);
        }}
        onOpen={() => setOpenSelect(true)}
        input={<Input />}
        renderValue={(selectedGroups) => (
          <div className={classes.chips}>
            {selectedGroups.map((group) => (
              <Chip key={group.id} label={group.name} className={classes.chip} />
            ))}
          </div>
        )}
        MenuProps={MenuProps}
        inputProps={{
          id: 'groups',
        }}
        className={classes.select}
      >
        {groups.map((group) => (
          <MenuItem key={group.id} value={group}>
            {group.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
