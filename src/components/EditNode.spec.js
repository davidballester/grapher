import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import { mount } from 'enzyme';

import EditNode from './EditNode';

describe(EditNode.name, () => {
  let isOpen;
  let node;
  let editNode;
  let cancelEditNode;

  beforeEach(() => {
    isOpen = true;
    node = {
      id: 'foo',
    };
    editNode = jest.fn();
    cancelEditNode = jest.fn();
  });

  it('renders without crashing', () => {
    const component = mount(<EditNode isOpen={isOpen} node={node} editNode={editNode} cancelEditNode={cancelEditNode} />);
    expect(component).toBeDefined();
  });

  it('sets the dialog `open` prop to `false` if `isOpen` flag is set to `false`', () => {
    const component = mount(<EditNode isOpen={false} node={node} editNode={editNode} cancelEditNode={cancelEditNode} />);
    const dialog = component.find(Dialog).getElement();
    expect(dialog.props.open).toBeFalsy();
  });

  it('sets the dialog `open` prop to `true` if `isOpen` flag is set to `true`', () => {
    const component = mount(<EditNode isOpen={true} node={node} editNode={editNode} cancelEditNode={cancelEditNode} />);
    const dialog = component.find(Dialog).getElement();
    expect(dialog.props.open).toBeTruthy();
  });

  it('invokes the `cancelEditNode` function when the `cancel` button is clicked', () => {
    const component = mount(<EditNode isOpen={isOpen} node={node} editNode={editNode} cancelEditNode={cancelEditNode} />);
    component.find('Button.cancel').simulate('click');
    expect(cancelEditNode).toHaveBeenCalled();
  });
});
