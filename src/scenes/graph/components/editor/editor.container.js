import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Editor from './editor.component';
import { getText, setText, getTextError } from '../../../../ducks/graph';

function mapStateToProps(state) {
  return {
    text: getText(state),
    textError: getTextError(state),
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
