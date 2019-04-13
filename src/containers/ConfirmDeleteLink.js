import { connect } from 'react-redux';

import ConfirmDeleteLink from '../components/ConfirmDeleteLink';
import { getIsOpen, closeConfirmDeleteLink, getLinkId } from '../modules/confirm-delete-link';
import { deleteLink } from '../modules/graph';

function mapStateToProps(state) {
  return {
    isOpen: getIsOpen(state),
    linkId: getLinkId(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    deleteLink: (linkId) => {
      dispatch(deleteLink(linkId));
      dispatch(closeConfirmDeleteLink());
    },
    cancel: () => dispatch(closeConfirmDeleteLink()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmDeleteLink);
