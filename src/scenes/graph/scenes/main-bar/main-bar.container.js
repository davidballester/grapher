import { connect } from 'react-redux';

import MainBar from './main-bar.component';
import { getName } from '../../../../ducks/graph';
import { openDialog, DIALOG_IDS } from '../../../../ducks/dialog.duck';

function mapStateToProps(state) {
  return {
    graphName: getName(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    openConfirmDeleteGraph: (graphName) => dispatch(openDialog(DIALOG_IDS.CONFIRM_DELETE_GRAPH, graphName)),
    openEditGraph: () => dispatch(openDialog(DIALOG_IDS.EDIT_GRAPH)),
    openExport: () => dispatch(openDialog(DIALOG_IDS.EXPORT_GRAPH)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainBar);
