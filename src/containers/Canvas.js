import { connect } from 'react-redux';

import { getNodesAsArray, getLinksAsArray } from '../modules/graph';
import Canvas from '../components/Canvas';

function mapStateToProps(state) {
  return {
    nodes: getNodesAsArray(state),
    links: getLinksAsArray(state),
  };
}

export default connect(mapStateToProps)(Canvas);
