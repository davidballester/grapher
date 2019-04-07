import React from 'react';
import { mount } from 'enzyme';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import SelectedNode from './SelectedNode';

describe(SelectedNode.name, () => {
  let openConfirmDeleteNode;
  let node;

  beforeEach(() => {
    openConfirmDeleteNode = jest.fn();
    node = {
      id: 'foo',
    };
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders without crashing', () => {
    const component = mount(<SelectedNode node={node} openConfirmDeleteNode={openConfirmDeleteNode} />);
    expect(component).toBeDefined();
  });

  it('displays the node ID in a Typography', () => {
    const component = mount(<SelectedNode node={node} openConfirmDeleteNode={openConfirmDeleteNode} />);
    expect(
      component
        .find(Typography)
        .last()
        .text()
    ).toEqual(node.id);
  });

  it('invokes the `openConfirmDeleteNode` prop when the delete button is clicked', () => {
    const component = mount(<SelectedNode node={node} openConfirmDeleteNode={openConfirmDeleteNode} />);
    component.find(Button).simulate('click');
    expect(openConfirmDeleteNode).toHaveBeenCalledWith([node.id]);
  });
});
