import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import MainBar from '../components/MainBar';
import { getName } from '../modules/graph';
import { openDialog, DIALOG_IDS } from '../modules/dialog';
import { openConfirmDeleteGraph } from '../modules/confirm-delete-graph';

function mapStateToProps(state) {
  return {
    graphName: getName(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(
      {
        openConfirmDeleteGraph,
      },
      dispatch
    ),
    openEditGraph: () => dispatch(openDialog(DIALOG_IDS.EDIT_GRAPH)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainBar);
