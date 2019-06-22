import { connect } from 'react-redux';

import SpeedDials from '../components/SpeedDials';
import { openDialog, DIALOG_IDS } from '../modules/dialog';
import { refresh } from '../modules/canvas';
import { openSubgraphCreator } from '../modules/subgraph-creator';

function mapDispatchToProps(dispatch) {
  return {
    openNewNode: () => dispatch(openDialog(DIALOG_IDS.NEW_NODE)),
    openNewLink: () => dispatch(openDialog(DIALOG_IDS.NEW_LINK)),
    refresh: () => dispatch(refresh()),
    openSubgraphCreator: () => dispatch(openSubgraphCreator()),
  };
}

export default connect(
  undefined,
  mapDispatchToProps
)(SpeedDials);
