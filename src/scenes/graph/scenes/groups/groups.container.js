import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Groups from './groups.component';
import { getGroupsAsArray, addGroup } from '../../../../ducks/groups.duck';

function mapStateToProps(state) {
  return {
    groups: getGroupsAsArray(state),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addGroup,
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Groups);
