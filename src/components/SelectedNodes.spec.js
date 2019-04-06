import React from 'react';
import { shallow } from 'enzyme';

import SelectedNodes, { StyledSelectedNode } from './SelectedNodes';

describe(SelectedNodes.name, () => {
  let deleteNode;
  let nodes;

  beforeEach(() => {
    deleteNode = jest.fn();
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
    const component = shallow(<SelectedNodes nodes={nodes} deleteNode={deleteNode} />);
    expect(component).toBeDefined();
  });

  it('renders a `SelectedNode` per node', () => {
    const component = shallow(<SelectedNodes nodes={nodes} deleteNode={deleteNode} />);
    expect(component.find(StyledSelectedNode).getElements()).toHaveLength(nodes.length);
  });

  it('passes each node to the `SelectedNode` components', () => {
    const component = shallow(<SelectedNodes nodes={nodes} deleteNode={deleteNode} />);
    const selectedNodes = component.find(StyledSelectedNode).getElements();
    selectedNodes.forEach((selectedNode, index) => {
      expect(selectedNode.props.node).toEqual(nodes[index]);
    });
  });

  it('passes the `deleteNode` prop to each `SelectedNode` component', () => {
    const component = shallow(<SelectedNodes nodes={nodes} deleteNode={deleteNode} />);
    const selectedNodes = component.find(StyledSelectedNode).getElements();
    selectedNodes.forEach((selectedNode) => {
      expect(selectedNode.props.deleteNode).toEqual(deleteNode);
    });
  });
});
