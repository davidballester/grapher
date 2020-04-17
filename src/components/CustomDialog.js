import React from 'react';

import Dialog from '@material-ui/core/Dialog';

export default function CustomDialog(props) {
  return (
    <Dialog container={() => document.querySelector('#css-root')} {...props}>
      {props.children}
    </Dialog>
  );
}
