import { connect } from 'react-redux';

import GraphList from '../components/GraphList';
import { getIsOpen, closeGraphList } from '../modules/graph-list';
import { getGraphNames } from '../modules/graph-names';
import { openNewGraph } from '../modules/new-graph';

function mapStateToProps(state) {
  return {
    isOpen: getIsOpen(state),
    graphNames: getGraphNames(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    openNewGraph: () => {
      dispatch(openNewGraph());
      dispatch(closeGraphList());
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GraphList);
