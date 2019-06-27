import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import GraphList from './graph-list.component';
import { openGraph } from '../graph/ducks';
import { getGraphNamesAsArray } from './graph-list.duck';
import { openNewGraph } from '../new-graph/new-graph.duck';
import { openImportGraph } from '../graph-import/graph-import.duck';

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
