import React from 'react';
import { shallow } from 'enzyme';

import SelectedNodes from './selected-nodes.component';
import SelectedNode from './components/selected-node.component';

describe(SelectedNodes.name, () => {
  let nodes;

  beforeEach(() => {
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
    const component = shallow(<SelectedNodes nodes={nodes} />);
    expect(component).toBeDefined();
  });

  it('renders a `SelectedNode` per node', () => {
    const component = shallow(<SelectedNodes nodes={nodes} />).dive();
    expect(component.find(SelectedNode).getElements()).toHaveLength(nodes.length);
  });

  it('passes each node to the `SelectedNode` components', () => {
    const component = shallow(<SelectedNodes nodes={nodes} />);
    const selectedNodes = component.find(SelectedNode).getElements();
    selectedNodes.forEach((selectedNode, index) => {
      expect(selectedNode.props.node).toEqual(nodes[index]);
    });
  });
});
