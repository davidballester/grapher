import React from 'react';
import { mount } from 'enzyme';
import Typography from '@material-ui/core/Typography';

import SelectedNode from './SelectedNode';

describe(SelectedNode.name, () => {
  let openConfirmDeleteNode;
  let openEditNode;
  let node;

  beforeEach(() => {
    openConfirmDeleteNode = jest.fn();
    openEditNode = jest.fn();
    node = {
      id: 'foo',
    };
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders without crashing', () => {
    const component = mount(<SelectedNode node={node} openConfirmDeleteNode={openConfirmDeleteNode} openEditNode={openEditNode} />);
    expect(component).toBeDefined();
  });

  it('displays the node ID in a Typography', () => {
    const component = mount(<SelectedNode node={node} openConfirmDeleteNode={openConfirmDeleteNode} openEditNode={openEditNode} />);
    expect(
      component
        .find(Typography)
        .last()
        .text()
    ).toEqual(node.id);
  });

  it('invokes the `openConfirmDeleteNode` prop when the delete button is clicked', () => {
    const component = mount(<SelectedNode node={node} openConfirmDeleteNode={openConfirmDeleteNode} openEditNode={openEditNode} />);
    component
      .find('[type="button"].delete')
      .first()
      .simulate('click');
    expect(openConfirmDeleteNode).toHaveBeenCalledWith([node.id]);
  });

  it('invokes the `openEditNode` prop when the delete button is clicked', () => {
    const component = mount(<SelectedNode node={node} openConfirmDeleteNode={openConfirmDeleteNode} openEditNode={openEditNode} />);
    component
      .find('[type="button"].edit')
      .first()
      .simulate('click');
    expect(openEditNode).toHaveBeenCalledWith(node);
  });
});
