import { connect } from 'react-redux';

import GraphList from '../components/GraphList';
import { getIsOpen } from '../modules/graph-list';
import { getGraphNames } from '../modules/graph-names';

function mapStateToProps(state) {
  return {
    isOpen: getIsOpen(state),
    graphNames: getGraphNames(state),
  };
}

export default connect(mapStateToProps)(GraphList);
