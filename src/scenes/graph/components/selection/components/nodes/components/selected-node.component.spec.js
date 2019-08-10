import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Markdown from 'react-markdown';

import SelectedNode from './selected-node.component';

describe(SelectedNode.name, () => {
  let shallow;
  let openConfirmDeleteNode;
  let openEditNode;
  let node;

  beforeEach(() => {
    shallow = createShallow({ dive: true });
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
    const component = shallow(<SelectedNode node={node} openConfirmDeleteNode={openConfirmDeleteNode} openEditNode={openEditNode} />);
    expect(component).toBeDefined();
  });

  it('displays the node ID in a Typography', () => {
    const component = shallow(<SelectedNode node={node} openConfirmDeleteNode={openConfirmDeleteNode} openEditNode={openEditNode} />);
    expect(
      component
        .find(Typography)
        .last()
        .text()
    ).toEqual(node.id);
  });

  it('invokes the `openConfirmDeleteNode` prop when the delete button is clicked', () => {
    const component = shallow(<SelectedNode node={node} openConfirmDeleteNode={openConfirmDeleteNode} openEditNode={openEditNode} />);
    component
      .find(Card)
      .dive()
      .find('.delete')
      .first()
      .simulate('click');
    expect(openConfirmDeleteNode).toHaveBeenCalledWith([node.id]);
  });

  it('invokes the `openEditNode` prop when the delete button is clicked', () => {
    const component = shallow(<SelectedNode node={node} openConfirmDeleteNode={openConfirmDeleteNode} openEditNode={openEditNode} />);
    component
      .find(Card)
      .dive()
      .find('.edit')
      .first()
      .simulate('click');
    expect(openEditNode).toHaveBeenCalledWith(node);
  });

  it('uses the description of the node as input for a Markdown element', () => {
    node.description = 'lorem ipsum';
    const component = shallow(<SelectedNode node={node} openConfirmDeleteNode={openConfirmDeleteNode} openEditNode={openEditNode} />);
    const markdown = component
      .find(Card)
      .dive()
      .find(Markdown)
      .first()
      .getElement();
    expect(markdown.props.source).toEqual('lorem ipsum');
  });
});
