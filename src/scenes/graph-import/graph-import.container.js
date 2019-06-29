import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Import from './graph-import.component';
import { importGraph, getErrors } from './graph-import.duck';
import { openGraphList } from '../../ducks/navigation';

function mapStateToProps(state) {
  return {
    errors: getErrors(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(
      {
        importGraph,
      },
      dispatch
    ),
    close: () => dispatch(openGraphList()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Import);
