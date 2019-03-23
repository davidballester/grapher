import React from 'react';
import { shallow } from 'enzyme';
import ForceGraph2D from 'react-force-graph-2d';

import Canvas from './Canvas';

describe('Canvas', () => {
  let nodes;

  beforeEach(() => {
    nodes = [{ id: 'foo' }, { id: 'bar' }, { id: 'baz' }, { id: 'qux' }];
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
    expect(nodesProps.map((n) => n.id).sort()).toEqual(nodes.map((n) => n.id).sort());
  });

  it('marks the selected nodes as selected in the array provided to the graph', () => {
    const selectedNodes = [nodes[0], nodes[2]];
    const component = shallow(<Canvas nodes={nodes} selectedNodes={selectedNodes} />);
    const graph = component.find(ForceGraph2D);
    const nodesProps = graph.props().graphData.nodes;
    const selectedNodesIds = nodesProps.filter((n) => n.selected).map((n) => n.id);
    expect(selectedNodesIds).toEqual(selectedNodes.map((n) => n.id));
  });

  describe('update', () => {
    it('unmarks the selected nodes if undefined is passed as prop', () => {
      const selectedNodes = [nodes[0], nodes[2]];
      const component = shallow(<Canvas nodes={nodes} selectedNodes={selectedNodes} />);
      component.setProps({ selectedNodes: undefined });
      const graph = component.find(ForceGraph2D);
      const nodesProps = graph.props().graphData.nodes;
      expect(nodesProps.find((node) => node.selected)).toBeFalsy();
    });

    it('swaps selected nodes if new ones are passed', () => {
      const component = shallow(<Canvas nodes={nodes} selectedNodes={[nodes[0], nodes[2]]} />);
      component.setProps({ selectedNodes: [nodes[1]] });
      const graph = component.find(ForceGraph2D);
      const nodesProps = graph.props().graphData.nodes;
      expect(nodesProps.find((node) => node.selected).id).toEqual(nodes[1].id);
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
      const component = shallow(<Canvas nodes={nodes} selectedNodes={[nodes[0]]} deselectNode={deselectNode} />);
      const graph = component.find(ForceGraph2D);
      graph.props().onNodeClick(nodes[0]);
      expect(deselectNode).toHaveBeenCalled();
    });
  });
});
