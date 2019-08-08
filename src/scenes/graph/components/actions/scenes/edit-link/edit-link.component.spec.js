import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import { mount } from 'enzyme';

import EditLink from './edit-link.component';

describe(EditLink.name, () => {
  let isOpen;
  let link;
  let editLink;
  let cancelEditLink;

  beforeEach(() => {
    isOpen = true;
    link = {
      id: 'foo',
      label: 'bar',
    };
    editLink = jest.fn();
    cancelEditLink = jest.fn();
  });

  it('renders without crashing', () => {
    const component = mount(<EditLink isOpen={isOpen} link={link} editLink={editLink} cancelEditLink={cancelEditLink} />);
    expect(component).toBeDefined();
  });

  it('sets the dialog `open` prop to `false` if `isOpen` flag is set to `false`', () => {
    const component = mount(<EditLink isOpen={false} link={link} editLink={editLink} cancelEditLink={cancelEditLink} />);
    const dialog = component.find(Dialog).getElement();
    expect(dialog.props.open).toBeFalsy();
  });

  it('sets the dialog `open` prop to `true` if `isOpen` flag is set to `true`', () => {
    const component = mount(<EditLink isOpen={true} link={link} editLink={editLink} cancelEditLink={cancelEditLink} />);
    const dialog = component.find(Dialog).getElement();
    expect(dialog.props.open).toBeTruthy();
  });

  it('invokes the `cancelEditLink` function when the `cancel` button is clicked', () => {
    const component = mount(<EditLink isOpen={isOpen} link={link} editLink={editLink} cancelEditLink={cancelEditLink} />);
    component
      .find('[type="button"].cancel')
      .first()
      .simulate('click');
    expect(cancelEditLink).toHaveBeenCalled();
  });
});
