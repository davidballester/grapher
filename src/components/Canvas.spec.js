import React from 'react';
import { shallow } from 'enzyme';
import ForceGraph2D from 'react-force-graph-2d';

import Canvas from './Canvas';

describe('Canvas', () => {
  let nodes;

  beforeEach(() => {
    nodes = [{ id: 'foo' }, { id: 'bar' }];
  });

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

  it('passes the nodes to the force graph', () => {
    const component = shallow(<Canvas nodes={nodes} />);
    const graph = component.find(ForceGraph2D);
    const nodesProps = graph.props().graphData.nodes;
    expect(nodesProps).toEqual(nodes);
  });

  it('marks the selected node as selected in the array provided to the graph', () => {
    const selectedNode = nodes[0];
    const component = shallow(<Canvas nodes={nodes} selectedNode={selectedNode} />);
    const graph = component.find(ForceGraph2D);
    const nodesProps = graph.props().graphData.nodes;
    expect(nodesProps).toEqual([{ id: 'foo', selected: true }, { id: 'bar' }]);
  });

  describe('update', () => {
    it('unmarks the selected node if undefined is passed as prop', () => {
      const component = shallow(<Canvas nodes={nodes} selectedNode={nodes[0]} />);
      component.setProps({ selectedNode: undefined });
      const graph = component.find(ForceGraph2D);
      const nodesProps = graph.props().graphData.nodes;
      expect(nodesProps[0].selected).toBeFalsy();
    });
  });

  describe('select', () => {
    it('invokes the `selectNode` function with the selected node when a not selected node is clicked', () => {
      const selectNode = jest.fn();
      const component = shallow(<Canvas nodes={nodes} selectNode={selectNode} />);
      const graph = component.find(ForceGraph2D);
      graph.props().onNodeClick(nodes[0]);
      expect(selectNode).toHaveBeenCalledWith(nodes[0]);
    });
  });

  describe('deselect', () => {
    it('invokes the `deselectNode` function when the selected node is clicked', () => {
      const deselectNode = jest.fn();
      const component = shallow(<Canvas nodes={nodes} selectedNode={nodes[0]} deselectNode={deselectNode} />);
      const graph = component.find(ForceGraph2D);
      graph.props().onNodeClick(nodes[0]);
      expect(deselectNode).toHaveBeenCalled();
    });
  });
});
