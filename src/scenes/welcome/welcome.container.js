import { connect } from 'react-redux';

import Welcome from './welcome.component';
import { openDialog, DIALOG_IDS } from '../../ducks/dialog.duck';
import { getGraphNamesAsArray } from './welcome.duck';
import { openGraph } from '../../ducks/navigation.duck';
import { setAuth, unsetAuth, isSignedIn } from '../../ducks/auth.duck';

function mapStateToProps(state) {
  return {
    graphNames: getGraphNamesAsArray(state),
    isSignedIn: isSignedIn(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    openNewGraph: () => dispatch(openDialog(DIALOG_IDS.NEW_GRAPH)),
    openGraph: (graphId) => dispatch(openGraph(graphId)),
    openImportGraph: () => dispatch(openDialog(DIALOG_IDS.IMPORT_GRAPH)),
    setAuth: (name, imageUrl) => dispatch(setAuth(name, imageUrl)),
    unsetAuth: () => dispatch(unsetAuth()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Welcome);
