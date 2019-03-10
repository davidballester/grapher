import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import { mount } from 'enzyme';

import NewNode from './NewNode';

describe(NewNode.name, () => {
  let isOpen;
  let saveNewNode;
  let cancelNewNode;

  beforeEach(() => {
    isOpen = true;
    saveNewNode = jest.fn();
    saveNewNode = jest.fn();
    cancelNewNode = jest.fn();
  });

  it('renders without crashing', () => {
    const component = mount(<NewNode isOpen={isOpen} saveNewNode={saveNewNode} cancelNewNode={cancelNewNode} />);
    expect(component).toBeDefined();
  });

  it('sets the dialog `open` prop to `false` if `isOpen` flag is set to `false`', () => {
    const component = mount(<NewNode isOpen={false} saveNewNode={saveNewNode} cancelNewNode={cancelNewNode} />);
    const dialog = component.find(Dialog).getElement();
    expect(dialog.props.open).toBeFalsy();
  });

  it('sets the dialog `open` prop to `true` if `isOpen` flag is set to `true`', () => {
    const component = mount(<NewNode isOpen={true} saveNewNode={saveNewNode} cancelNewNode={cancelNewNode} />);
    const dialog = component.find(Dialog).getElement();
    expect(dialog.props.open).toBeTruthy();
  });

  it('invokes the `cancelNewNode` function when the `cancel` button is clicked', () => {
    const component = mount(<NewNode isOpen={isOpen} saveNewNode={saveNewNode} cancelNewNode={cancelNewNode} />);
    component.find('Button.cancel').simulate('click');
    expect(cancelNewNode).toHaveBeenCalled();
  });
});
