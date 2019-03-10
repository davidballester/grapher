import { connect } from 'react-redux';

import { getNodesAsArray, getLinksAsArray } from '../modules/graph';
import Canvas from '../components/Canvas';
import { openNewNode } from '../modules/new-node';

function mapStateToProps(state) {
  return {
    nodes: getNodesAsArray(state),
    links: getLinksAsArray(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    openNewNode: () => dispatch(openNewNode()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Canvas);
