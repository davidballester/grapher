import { connect } from 'react-redux';

import Welcome from './welcome.component';
import { openDialog, DIALOG_IDS } from '../../ducks/dialog.duck';
import { getGraphNamesAsArray } from './welcome.duck';
import { openGraph } from '../../ducks/navigation.duck';
import { isInitialized } from '../../ducks/auth.duck';

function mapStateToProps(state) {
  return {
    graphNames: getGraphNamesAsArray(state),
    isAuthInitialized: isInitialized(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    openNewGraph: () => dispatch(openDialog(DIALOG_IDS.NEW_GRAPH)),
    openGraph: (graphId) => dispatch(openGraph(graphId)),
    openImportGraph: () => dispatch(openDialog(DIALOG_IDS.IMPORT_GRAPH)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Welcome);
