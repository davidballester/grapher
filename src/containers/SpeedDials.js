import { connect } from 'react-redux';

import SpeedDials from '../components/SpeedDials';
import { openDialog, DIALOG_IDS } from '../modules/dialog';
import { refresh } from '../modules/canvas';

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
