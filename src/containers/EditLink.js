import { connect } from 'react-redux';

import EditLink from '../components/EditLink';
import { getIsOpen, getLink, closeEditLink } from '../modules/edit-link';
import { editLink } from '../modules/graph';

function mapStateToProps(state) {
  return {
    isOpen: getIsOpen(state),
    link: getLink(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    editLink: (link) => {
      dispatch(editLink(link));
      dispatch(closeEditLink());
    },
    cancelEditLink: () => dispatch(closeEditLink()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditLink);
