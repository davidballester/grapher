import React from 'react';
import { shallow } from 'enzyme';

import SelectedNodes, { StyledSelectedNode } from './SelectedNodes';

describe(SelectedNodes.name, () => {
  let openConfirmDeleteNode;
  let nodes;

  beforeEach(() => {
    openConfirmDeleteNode = jest.fn();
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
    const component = shallow(<SelectedNodes nodes={nodes} openConfirmDeleteNode={openConfirmDeleteNode} />);
    expect(component).toBeDefined();
  });

  it('renders a `SelectedNode` per node', () => {
    const component = shallow(<SelectedNodes nodes={nodes} openConfirmDeleteNode={openConfirmDeleteNode} />);
    expect(component.find(StyledSelectedNode).getElements()).toHaveLength(nodes.length);
  });

  it('passes each node to the `SelectedNode` components', () => {
    const component = shallow(<SelectedNodes nodes={nodes} openConfirmDeleteNode={openConfirmDeleteNode} />);
    const selectedNodes = component.find(StyledSelectedNode).getElements();
    selectedNodes.forEach((selectedNode, index) => {
      expect(selectedNode.props.node).toEqual(nodes[index]);
    });
  });

  it('passes the `openConfirmDeleteNode` prop to each `SelectedNode` component', () => {
    const component = shallow(<SelectedNodes nodes={nodes} openConfirmDeleteNode={openConfirmDeleteNode} />);
    const selectedNodes = component.find(StyledSelectedNode).getElements();
    selectedNodes.forEach((selectedNode) => {
      expect(selectedNode.props.openConfirmDeleteNode).toEqual(openConfirmDeleteNode);
    });
  });
});
