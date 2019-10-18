import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Editor from './editor.component';
import { getText, setText } from '../../../../ducks/graph';

function mapStateToProps(state) {
  return {
    text: getText(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(
      {
        setText,
      },
      dispatch
    ),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Editor);
