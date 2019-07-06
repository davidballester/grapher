import { connect } from 'react-redux';

import Groups from './groups.component';
import { getGroupsAsArray } from '../../../../ducks/groups.duck';

function mapStateToProps(state) {
  return {
    groups: getGroupsAsArray(state),
  };
}

export default connect(mapStateToProps)(Groups);
