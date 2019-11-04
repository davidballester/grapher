import { connect } from 'react-redux';

import Welcome from './welcome.component';
import { openDialog, DIALOG_IDS } from '../../ducks/dialog.duck';
import { getGraphNamesAsArray } from './welcome.duck';
import { openGraph } from '../../ducks/navigation.duck';

function mapStateToProps(state) {
  return {
    graphNames: getGraphNamesAsArray(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    openNewGraph: () => dispatch(openDialog(DIALOG_IDS.NEW_GRAPH)),
    openGraph: (graphId) => dispatch(openGraph(graphId)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Welcome);
