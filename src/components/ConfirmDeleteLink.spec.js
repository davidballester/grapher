import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import { mount } from 'enzyme';

import ConfirmDeleteLink from './ConfirmDeleteLink';

describe(ConfirmDeleteLink.name, () => {
  let isOpen;
  let linkId;
  let linkLabel;
  let deleteLink;
  let cancel;

  beforeEach(() => {
    isOpen = true;
    linkId = 'foo';
    linkLabel = 'bar';
    deleteLink = jest.fn();
    cancel = jest.fn();
  });

  it('renders without crashing', () => {
    const component = mount(<ConfirmDeleteLink isOpen={isOpen} linkId={linkId} linkLabel={linkLabel} deleteLink={deleteLink} cancel={cancel} />);
    expect(component).toBeDefined();
  });

  it('sets the dialog `open` prop to `false` if `isOpen` flag is set to `false`', () => {
    const component = mount(<ConfirmDeleteLink isOpen={false} linkId={linkId} deleteLink={deleteLink} cancel={cancel} />);
    const dialog = component.find(Dialog).getElement();
    expect(dialog.props.open).toBeFalsy();
  });

  it('sets the dialog `open` prop to `true` if `isOpen` flag is set to `true`', () => {
    const component = mount(<ConfirmDeleteLink isOpen={true} linkId={linkId} deleteLink={deleteLink} cancel={cancel} />);
    const dialog = component.find(Dialog).getElement();
    expect(dialog.props.open).toBeTruthy();
  });

  it('invokes the `cancel` function when the `cancel` button is clicked', () => {
    const component = mount(<ConfirmDeleteLink isOpen={isOpen} linkId={linkId} deleteLink={deleteLink} cancel={cancel} />);
    component
      .find('[type="button"].cancel')
      .first()
      .simulate('click');
    expect(cancel).toHaveBeenCalled();
  });

  it('invokes the `deleteLink` function when the `delete` button is clicked', () => {
    const component = mount(<ConfirmDeleteLink isOpen={isOpen} linkId={linkId} deleteLink={deleteLink} cancel={cancel} />);
    component
      .find('[type="button"].delete')
      .first()
      .simulate('click');
    expect(deleteLink).toHaveBeenCalledWith(linkId);
  });
});
