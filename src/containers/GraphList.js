import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import GraphList from '../components/GraphList';
import { openGraph } from '../modules/graph';
import { getGraphNamesAsArray } from '../modules/graph-list';
import { openNewGraph } from '../modules/new-graph';
import { openImportGraph } from '../modules/graph-import';

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
