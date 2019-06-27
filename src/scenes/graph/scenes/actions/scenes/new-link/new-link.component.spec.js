import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import { mount } from 'enzyme';

import NewLink from './new-link.component';

describe(NewLink.name, () => {
  let isOpen;
  let saveNewLink;
  let cancelNewLink;
  let nodesIds;

  beforeEach(() => {
    isOpen = true;
    saveNewLink = jest.fn();
    cancelNewLink = jest.fn();
    nodesIds = [];
  });

  it('renders without crashing', () => {
    const component = mount(<NewLink isOpen={isOpen} saveNewLink={saveNewLink} cancelNewLink={cancelNewLink} nodesIds={nodesIds} />);
    expect(component).toBeDefined();
  });

  it('sets the dialog `open` prop to `false` if `isOpen` flag is set to `false`', () => {
    const component = mount(<NewLink isOpen={false} saveNewLink={saveNewLink} cancelNewLink={cancelNewLink} nodesIds={nodesIds} />);
    const dialog = component.find(Dialog).getElement();
    expect(dialog.props.open).toBeFalsy();
  });

  it('sets the dialog `open` prop to `true` if `isOpen` flag is set to `true`', () => {
    const component = mount(<NewLink isOpen={true} saveNewLink={saveNewLink} cancelNewLink={cancelNewLink} nodesIds={nodesIds} />);
    const dialog = component.find(Dialog).getElement();
    expect(dialog.props.open).toBeTruthy();
  });

  it('invokes the `cancel` function when the `cancel` button is clicked', () => {
    const component = mount(<NewLink isOpen={isOpen} saveNewLink={saveNewLink} cancelNewLink={cancelNewLink} nodesIds={nodesIds} />);
    component
      .find('[type="button"].cancel')
      .first()
      .simulate('click');
    expect(cancelNewLink).toHaveBeenCalled();
  });
});
