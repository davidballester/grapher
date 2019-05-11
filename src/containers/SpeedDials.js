import { connect } from 'react-redux';

import SpeedDials from '../components/SpeedDials';
import { openDialog, DIALOG_IDS } from '../modules/dialog';

function mapDispatchToProps(dispatch) {
  return {
    openNewNode: () => dispatch(openDialog(DIALOG_IDS.NEW_NODE)),
  };
}

export default connect(
  undefined,
  mapDispatchToProps
)(SpeedDials);
