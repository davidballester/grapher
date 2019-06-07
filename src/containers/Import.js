import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Import from '../components/Import';
import { importGraph, getErrors } from '../modules/graph-import';
import { openGraphList } from '../modules/graph-list';

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
