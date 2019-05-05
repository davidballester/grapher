import { connect } from 'react-redux';

import MainBar from '../components/MainBar';
import { getName } from '../modules/graph';
import { openDialog, DIALOG_IDS } from '../modules/dialog';

function mapStateToProps(state) {
  return {
    graphName: getName(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    openConfirmDeleteGraph: (graphName) => dispatch(openDialog(DIALOG_IDS.CONFIRM_DELETE_GRAPH, graphName)),
    openEditGraph: () => dispatch(openDialog(DIALOG_IDS.EDIT_GRAPH)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainBar);
