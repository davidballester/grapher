import React from 'react';
import { shallow } from 'enzyme';
import ForceGraph2D from 'react-force-graph-2d';

import Canvas from './Canvas';

describe('Canvas', () => {
  it('renders without crashing', () => {
    const component = shallow(<Canvas />);
    expect(component).toBeDefined();
  });

  it('invokes `openNewNode` on double click over the containing div', () => {
    const openNewNode = jest.fn();
    const className = 'container';
    const component = shallow(<Canvas openNewNode={openNewNode} className={className} />);
    const container = component.find(`.${className}`);
    container.simulate('doubleClick');
    expect(openNewNode).toHaveBeenCalled();
  });

  it('marks the selected node as selected in the array provided to the graph', () => {
    const nodes = [{ id: 'foo' }, { id: 'bar' }];
    const selectedNode = nodes[0];
    const component = shallow(<Canvas nodes={nodes} selectedNode={selectedNode} />);
    const graph = component.find(ForceGraph2D);
    const nodesProps = graph.props().graphData.nodes;
    expect(nodesProps).toEqual([{ id: 'foo', selected: true }, { id: 'bar', selected: false }]);
  });
});
