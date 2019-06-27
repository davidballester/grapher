import React from 'react';
import { shallow } from 'enzyme';

import SelectedNodes, { StyledSelectedNode } from './selected-nodes.component';

describe(SelectedNodes.name, () => {
  let openConfirmDeleteNode;
  let openEditNode;
  let nodes;

  beforeEach(() => {
    openConfirmDeleteNode = jest.fn();
    openEditNode = jest.fn();
    nodes = [
      {
        id: 'foo',
      },
      {
        id: 'bar',
      },
    ];
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders without crashing', () => {
    const component = shallow(<SelectedNodes nodes={nodes} openConfirmDeleteNode={openConfirmDeleteNode} openEditNode={openEditNode} />);
    expect(component).toBeDefined();
  });

  it('renders a `SelectedNode` per node', () => {
    const component = shallow(<SelectedNodes nodes={nodes} openConfirmDeleteNode={openConfirmDeleteNode} openEditNode={openEditNode} />);
    expect(component.find(StyledSelectedNode).getElements()).toHaveLength(nodes.length);
  });

  it('passes each node to the `SelectedNode` components', () => {
    const component = shallow(<SelectedNodes nodes={nodes} openConfirmDeleteNode={openConfirmDeleteNode} openEditNode={openEditNode} />);
    const selectedNodes = component.find(StyledSelectedNode).getElements();
    selectedNodes.forEach((selectedNode, index) => {
      expect(selectedNode.props.node).toEqual(nodes[index]);
    });
  });

  it('passes the `openConfirmDeleteNode` prop to each `SelectedNode` component', () => {
    const component = shallow(<SelectedNodes nodes={nodes} openConfirmDeleteNode={openConfirmDeleteNode} openEditNode={openEditNode} />);
    const selectedNodes = component.find(StyledSelectedNode).getElements();
    selectedNodes.forEach((selectedNode) => {
      expect(selectedNode.props.openConfirmDeleteNode).toEqual(openConfirmDeleteNode);
    });
  });

  it('passes the `openEditNode` prop to each `SelectedNode` component', () => {
    const component = shallow(<SelectedNodes nodes={nodes} openConfirmDeleteNode={openConfirmDeleteNode} openEditNode={openEditNode} />);
    const selectedNodes = component.find(StyledSelectedNode).getElements();
    selectedNodes.forEach((selectedNode) => {
      expect(selectedNode.props.openEditNode).toEqual(openEditNode);
    });
  });
});
