import { connect } from 'react-redux';

import SpeedDials from './speed-dials.component';
import { openDialog, DIALOG_IDS } from '../../../../ducks/dialog.duck';
import { refresh } from '../../../../components/canvas/canvas.duck';

function mapDispatchToProps(dispatch) {
  return {
    openNewNode: () => dispatch(openDialog(DIALOG_IDS.NEW_NODE)),
    openNewLink: () => dispatch(openDialog(DIALOG_IDS.NEW_LINK)),
    refresh: () => dispatch(refresh()),
  };
}

export default connect(
  undefined,
  mapDispatchToProps
)(SpeedDials);
