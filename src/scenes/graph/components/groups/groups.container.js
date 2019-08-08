import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Groups from './groups.component';
import { getGroupsAsArray, addGroup, removeGroup, updateGroup } from '../../../../ducks/graph';

function mapStateToProps(state) {
  return {
    groups: getGroupsAsArray(state),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addGroup,
      removeGroup,
      updateGroup,
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Groups);