import React from 'react';
import { shallow } from 'enzyme';
import ForceGraph2D from 'react-force-graph-2d';

import Canvas from './Canvas';
jest.mock('../services/links-service', () => ({
  __esModule: true,
  default: {
    getId: jest.fn(),
  },
}));

// eslint-disable-next-line import/first
import linksService from '../services/links-service';

describe('Canvas', () => {
  let nodes;
  let links;
  let virtualLink;

  beforeEach(() => {
    nodes = [{ id: 'foo' }, { id: 'bar' }, { id: 'baz' }, { id: 'qux' }];
    links = [
      {
        source: 'foo',
        target: 'bar',
      },
      {
        source: 'bar',
        target: 'baz',
      },
      {
        source: 'baz',
        target: 'qux',
      },
    ];
    virtualLink = { source: 'foo', target: 'qux' };
    linksService.getId.mockImplementation((link) => 'linkId');
  });

  afterEach(() => {
    jest.resetAllMocks();
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

  it('passes the links to the force graph', () => {
    const component = shallow(<Canvas links={links} />);
    const graph = component.find(ForceGraph2D);
    const linksProps = graph.props().graphData.links;
    expect(linksProps.map(({ source, target }) => ({ source, target }))).toEqual(links);
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

  describe('virtual links', () => {
    it('adds a link to the props passed to the force graph with `virtual` set to `true` when `virtualLink` is provided', () => {
      const component = shallow(<Canvas links={links} virtualLink={virtualLink} />);
      const graph = component.find(ForceGraph2D);
      const linksProps = graph.props().graphData.links;
      expect(linksProps).toContainEqual({ id: 'linkId', ...virtualLink, virtual: true });
    });
  });

  describe('create link', () => {
    let createLink;

    beforeEach(() => {
      createLink = jest.fn();
    });

    it('invokes the create link if a virtual link is clicked', () => {
      const component = shallow(<Canvas virtualLink={virtualLink} createLink={createLink} />);
      const graph = component.find(ForceGraph2D);
      graph.props().onLinkClick({
        source: nodes.find((n) => n.id === virtualLink.source),
        target: nodes.find((n) => n.id === virtualLink.target),
        virtual: true,
      });
      expect(createLink).toHaveBeenCalledWith(virtualLink);
    });

    it('does not invoke the create link if a not-virtual link is clicked', () => {
      const component = shallow(<Canvas links={links} createLink={createLink} />);
      const graph = component.find(ForceGraph2D);
      const link = graph.props().graphData.links[0];
      graph.props().onLinkClick(link);
      expect(createLink).not.toHaveBeenCalled();
    });
  });
});
