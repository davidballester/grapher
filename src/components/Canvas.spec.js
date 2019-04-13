import React from 'react';
import { shallow } from 'enzyme';
import ForceGraph2D from 'react-force-graph-2d';

import Canvas from './Canvas';

describe('Canvas', () => {
  let nodes;
  let links;
  let virtualLink;
  let selectedLink;

  beforeEach(() => {
    nodes = [{ id: 'foo' }, { id: 'bar' }, { id: 'baz' }, { id: 'qux' }];
    links = [
      {
        id: 'foo-bar',
        source: 'foo',
        target: 'bar',
      },
      {
        id: 'bar-baz',
        source: 'bar',
        target: 'baz',
      },
      {
        id: 'baz-qux',
        source: 'baz',
        target: 'qux',
      },
    ];
    virtualLink = {
      id: 'source-qux',
      source: 'foo',
      target: 'qux',
    };
    selectedLink = {
      id: links[1].id,
      source: nodes.find((n) => n.id === links[1].source),
      target: nodes.find((n) => n.id === links[1].target),
    };
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

  describe('nodes', () => {
    it('passes the nodes to the force graph', () => {
      const component = shallow(<Canvas nodes={nodes} />);
      const graph = component.find(ForceGraph2D);
      const nodesProps = graph.props().graphData.nodes;
      expect(nodesProps.map((n) => n.id).sort()).toEqual(nodes.map((n) => n.id).sort());
    });

    it('updates the nodes', () => {
      const component = shallow(<Canvas nodes={nodes} />);
      component.setProps({
        nodes: [
          nodes[0],
          {
            id: 'quux',
          },
        ],
      });
      const graph = component.find(ForceGraph2D);
      const nodesProps = graph.props().graphData.nodes;
      expect(nodesProps.map((n) => n.id).sort()).toEqual([nodes[0].id, 'quux'].sort());
    });
  });

  describe('links', () => {
    it('passes the links to the force graph', () => {
      const component = shallow(<Canvas links={links} />);
      const graph = component.find(ForceGraph2D);
      const linksProps = graph.props().graphData.links;
      expect(linksProps).toEqual(links);
    });

    it('updates the links', () => {
      const component = shallow(<Canvas links={links} />);
      component.setProps({
        links: [
          links[0],
          {
            id: 'foo-qux',
            source: 'foo',
            target: 'qux',
          },
        ],
      });
      const graph = component.find(ForceGraph2D);
      const linksProps = graph.props().graphData.links;
      expect(linksProps).toEqual([
        links[0],
        {
          id: 'foo-qux',
          source: 'foo',
          target: 'qux',
        },
      ]);
    });
  });

  describe('selected nodes', () => {
    it('marks the selected nodes as selected in the array provided to the graph', () => {
      const selectedNodes = [nodes[0], nodes[2]];
      const component = shallow(<Canvas nodes={nodes} selectedNodes={selectedNodes} />);
      const graph = component.find(ForceGraph2D);
      const nodesProps = graph.props().graphData.nodes;
      const selectedNodesIds = nodesProps.filter((n) => n.selected).map((n) => n.id);
      expect(selectedNodesIds).toEqual(selectedNodes.map((n) => n.id));
    });

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

  describe('select node', () => {
    it('invokes the `selectNode` function with the selected node when a not selected node is clicked', () => {
      const selectNode = jest.fn();
      const component = shallow(<Canvas nodes={nodes} selectNode={selectNode} />);
      const graph = component.find(ForceGraph2D);
      graph.props().onNodeClick(nodes[0]);
      expect(selectNode).toHaveBeenCalledWith(nodes[0]);
    });
  });

  describe('deselect node', () => {
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
        id: virtualLink.id,
        source: nodes.find((n) => n.id === virtualLink.source),
        target: nodes.find((n) => n.id === virtualLink.target),
        virtual: true,
      });
      expect(createLink).toHaveBeenCalledWith(virtualLink);
    });

    it('does not invoke the create link if a not-virtual link is clicked', () => {
      const component = shallow(<Canvas links={links} createLink={createLink} selectLink={jest.fn()} />);
      const graph = component.find(ForceGraph2D);
      const link = graph.props().graphData.links[0];
      graph.props().onLinkClick(link);
      expect(createLink).not.toHaveBeenCalled();
    });
  });

  describe('delete node', () => {
    let openConfirmDeleteNode;

    beforeEach(() => {
      openConfirmDeleteNode = jest.fn();
    });

    ['Backspace', 'Delete'].forEach((key) => {
      describe(key, () => {
        it('does nothing if no nodes are selected', () => {
          const component = shallow(<Canvas nodes={nodes} openConfirmDeleteNode={openConfirmDeleteNode} />);
          component
            .find('div')
            .first()
            .simulate('keyup', {
              key,
            });
          expect(openConfirmDeleteNode).not.toHaveBeenCalled();
        });

        it('invokes `openConfirmDeleteNode` with each selected node', () => {
          const component = shallow(<Canvas nodes={nodes} selectedNodes={nodes} openConfirmDeleteNode={openConfirmDeleteNode} />);
          component
            .find('div')
            .first()
            .simulate('keyup', {
              key,
            });
          expect(openConfirmDeleteNode).toHaveBeenCalledWith(nodes.map((node) => node.id));
        });

        it('does nothing if a link is also selected', () => {
          const component = shallow(
            <Canvas selectedLink={selectedLink} links={links} nodes={nodes} selectedNodes={nodes} openConfirmDeleteNode={openConfirmDeleteNode} />
          );
          component
            .find('div')
            .first()
            .simulate('keyup', {
              key,
            });
          expect(openConfirmDeleteNode).not.toHaveBeenCalled();
        });
      });
    });
  });

  describe('selected link', () => {
    it('marks the selected link as selected in the array provided to the graph', () => {
      const component = shallow(<Canvas links={links} selectedLink={selectedLink} />);
      const graph = component.find(ForceGraph2D);
      const linksProps = graph.props().graphData.links;
      expect(linksProps.find((link) => link.id === selectedLink.id)).toEqual({
        id: selectedLink.id,
        source: selectedLink.source.id,
        target: selectedLink.target.id,
        selected: true,
      });
    });

    it('unmarks the selected link if undefined is passed as prop', () => {
      const component = shallow(<Canvas links={links} selectedLink={selectedLink} />);
      component.setProps({ selectedLink: undefined });
      const graph = component.find(ForceGraph2D);
      const linksProps = graph.props().graphData.links;
      expect(linksProps.find((l) => l.selected)).toBeFalsy();
    });

    it('swaps selected links if a new one is passed', () => {
      const component = shallow(<Canvas links={links} selectedLink={selectedLink} />);
      selectedLink = {
        id: links[0].id,
        source: nodes.find((n) => n.id === links[0].source),
        target: nodes.find((n) => n.id === links[0].target),
      };
      component.setProps({ selectedLink });
      const graph = component.find(ForceGraph2D);
      const linksProps = graph.props().graphData.links;
      expect(linksProps.find((l) => l.selected).id).toEqual(links[0].id);
    });
  });

  describe('select link', () => {
    it('invokes the `selectLink` function with the selected link when a not selected link is clicked', () => {
      const selectLink = jest.fn();
      const component = shallow(<Canvas links={links} selectLink={selectLink} />);
      const graph = component.find(ForceGraph2D);
      graph.props().onLinkClick(links[0]);
      expect(selectLink).toHaveBeenCalledWith(links[0]);
    });
  });

  describe('deselect link', () => {
    it('invokes the `deselectLink` function when the selected link is clicked', () => {
      const deselectLink = jest.fn();
      const component = shallow(<Canvas links={links} selectedLink={selectedLink} deselectLink={deselectLink} />);
      const graph = component.find(ForceGraph2D);
      const graphLinks = graph.props().graphData.links;
      graph.props().onLinkClick(graphLinks[1]);
      expect(deselectLink).toHaveBeenCalled();
    });
  });

  describe('delete link', () => {
    let openConfirmDeleteLink;

    beforeEach(() => {
      openConfirmDeleteLink = jest.fn();
    });

    ['Backspace', 'Delete'].forEach((key) => {
      describe(key, () => {
        it('does nothing if no link is selected', () => {
          const component = shallow(<Canvas links={links} openConfirmDeleteLink={openConfirmDeleteLink} />);
          component
            .find('div')
            .first()
            .simulate('keyup', {
              key,
            });
          expect(openConfirmDeleteLink).not.toHaveBeenCalled();
        });

        it('invokes `openConfirmDeleteLink` with the selected link id', () => {
          const component = shallow(<Canvas links={links} selectedLink={selectedLink} openConfirmDeleteLink={openConfirmDeleteLink} />);
          component
            .find('div')
            .first()
            .simulate('keyup', {
              key,
            });
          expect(openConfirmDeleteLink).toHaveBeenCalledWith(selectedLink.id);
        });

        it('does nothing if a node is also selected', () => {
          const component = shallow(
            <Canvas
              selectedNodes={[nodes[0]]}
              nodes={nodes}
              selectedLink={selectedLink}
              links={links}
              openConfirmDeleteLink={openConfirmDeleteLink}
            />
          );
          component
            .find('div')
            .first()
            .simulate('keyup', {
              key,
            });
          expect(openConfirmDeleteLink).not.toHaveBeenCalled();
        });
      });
    });
  });
});
