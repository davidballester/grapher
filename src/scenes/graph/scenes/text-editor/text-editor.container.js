import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { processSubgraph, importSubgraph, getError } from '../../../../ducks/subgraph-creator.duck';
import TextEditor from './text-editor.component';

function mapStateToProps(state) {
  return {
    error: getError(state),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ processSubgraph, importSubgraph }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TextEditor);
