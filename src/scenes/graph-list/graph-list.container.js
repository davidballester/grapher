import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import GraphList from './graph-list.component';
import { getGraphNamesAsArray } from './graph-list.duck';
import { openImportGraph, openNewGraph, openGraph } from '../../ducks/navigation';

function mapStateToProps(state) {
  return {
    graphNames: getGraphNamesAsArray(state),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      openNewGraph,
      openGraph,
      openImportGraph,
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GraphList);
