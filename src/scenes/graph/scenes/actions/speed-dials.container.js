import { connect } from 'react-redux';

import SpeedDials from './speed-dials.component';
import { openDialog, DIALOG_IDS } from '../../../../ducks/dialog';
import { refresh } from '../../../../components/canvas/canvas.duck';
import { openSubgraphCreator } from '../../../subgraph-creator/subgraph-creator.duck';

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
