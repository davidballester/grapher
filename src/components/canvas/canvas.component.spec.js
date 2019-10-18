import React from 'react';
import { shallow } from 'enzyme';
import ForceGraph2D from 'react-force-graph-2d';

import Canvas from './canvas.component';

// TODO: Wait for https://github.com/facebook/react/pull/16168 to be merged so we can use shallow renderer and still get useEffect hooks working.
xdescribe('Canvas', () => {
  let nodes;
  let links;
  let virtualLink;
  let selectedLink;
  let registerCanvasComponent;

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
    selectedLink = links[1];
    registerCanvasComponent = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders without crashing', () => {
    const component = shallow(<Canvas registerCanvasComponent={registerCanvasComponent} />);
    expect(component).toBeDefined();
  });

  it('invokes `openNewNode` on double click over the containing div', () => {
    const openNewNode = jest.fn();
    const className = 'container';
    const component = shallow(<Canvas registerCanvasComponent={registerCanvasComponent} openNewNode={openNewNode} className={className} />);
    const container = component.find(`.${className}`);
    container.simulate('doubleClick');
    expect(openNewNode).toHaveBeenCalled();
  });

  describe('nodes', () => {
    it('passes the nodes to the force graph', () => {
      const component = shallow(<Canvas registerCanvasComponent={registerCanvasComponent} nodes={nodes} />);
      const graph = component.find(ForceGraph2D);
      const nodesProps = graph.props().graphData.nodes;
      expect(nodesProps.map((n) => n.id).sort()).toEqual(nodes.map((n) => n.id).sort());
    });

    it('updates the nodes', () => {
      const component = shallow(<Canvas registerCanvasComponent={registerCanvasComponent} nodes={nodes} />);
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
      const expectedLinks = links.map((link) => ({ ...link, original: link }));
      const component = shallow(<Canvas registerCanvasComponent={registerCanvasComponent} links={links} />);
      const graph = component.find(ForceGraph2D);
      const linksProps = graph.props().graphData.links;
      expect(linksProps).toEqual(expectedLinks);
    });

    it('updates the links', () => {
      const expectedLinks = [
        links[0],
        {
          id: 'foo-qux',
          source: 'foo',
          target: 'qux',
        },
      ].map((link) => ({ ...link, original: link }));
      const component = shallow(<Canvas registerCanvasComponent={registerCanvasComponent} links={links} />);
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
      expect(linksProps).toEqual(expectedLinks);
    });
  });

  describe('selected nodes', () => {
    it('marks the selected nodes as selected in the array provided to the graph', () => {
      const selectedNodes = [nodes[0], nodes[2]];
      const component = shallow(<Canvas registerCanvasComponent={registerCanvasComponent} nodes={nodes} selectedNodes={selectedNodes} />);
      const graph = component.find(ForceGraph2D);
      const nodesProps = graph.props().graphData.nodes;
      const selectedNodesIds = nodesProps.filter((n) => n.selected).map((n) => n.id);
      expect(selectedNodesIds).toEqual(selectedNodes.map((n) => n.id));
    });

    it('unmarks the selected nodes if undefined is passed as prop', () => {
      const selectedNodes = [nodes[0], nodes[2]];
      const component = shallow(<Canvas registerCanvasComponent={registerCanvasComponent} nodes={nodes} selectedNodes={selectedNodes} />);
      component.setProps({ selectedNodes: undefined });
      const graph = component.find(ForceGraph2D);
      const nodesProps = graph.props().graphData.nodes;
      expect(nodesProps.find((node) => node.selected)).toBeFalsy();
    });

    it('swaps selected nodes if new ones are passed', () => {
      const component = shallow(<Canvas registerCanvasComponent={registerCanvasComponent} nodes={nodes} selectedNodes={[nodes[0], nodes[2]]} />);
      component.setProps({ selectedNodes: [nodes[1]] });
      const graph = component.find(ForceGraph2D);
      const nodesProps = graph.props().graphData.nodes;
      expect(nodesProps.find((node) => node.selected).id).toEqual(nodes[1].id);
    });
  });

  describe('select node', () => {
    it('invokes the `selectNode` function with the selected node when a not selected node is clicked', () => {
      const selectNode = jest.fn();
      const component = shallow(<Canvas registerCanvasComponent={registerCanvasComponent} nodes={nodes} selectNode={selectNode} />);
      const graph = component.find(ForceGraph2D);
      graph.props().onNodeClick(nodes[0]);
      expect(selectNode).toHaveBeenCalledWith(nodes[0]);
    });
  });

  describe('deselect node', () => {
    it('invokes the `deselectNode` function when the selected node is clicked', () => {
      const deselectNode = jest.fn();
      const component = shallow(
        <Canvas registerCanvasComponent={registerCanvasComponent} nodes={nodes} selectedNodes={[nodes[0]]} deselectNode={deselectNode} />
      );
      const graph = component.find(ForceGraph2D);
      graph.props().onNodeClick(nodes[0]);
      expect(deselectNode).toHaveBeenCalled();
    });
  });

  describe('virtual links', () => {
    it('adds a link to the props passed to the force graph with `virtual` set to `true` when `virtualLink` is provided', () => {
      const component = shallow(<Canvas registerCanvasComponent={registerCanvasComponent} links={links} virtualLink={virtualLink} />);
      const graph = component.find(ForceGraph2D);
      const linksProps = graph.props().graphData.links;
      expect(linksProps.find(({ id }) => id === virtualLink.id)).toMatchObject({ virtual: true });
    });
  });

  describe('create link', () => {
    let createLink;

    beforeEach(() => {
      createLink = jest.fn();
    });

    it('invokes the create link if a virtual link is clicked', () => {
      const component = shallow(<Canvas registerCanvasComponent={registerCanvasComponent} createLink={createLink} />);
      const graph = component.find(ForceGraph2D);
      graph.props().onLinkClick({
        virtual: true,
        original: virtualLink,
      });
      expect(createLink).toHaveBeenCalledWith(virtualLink);
    });

    it('does not invoke the create link if a not-virtual link is clicked', () => {
      const component = shallow(
        <Canvas registerCanvasComponent={registerCanvasComponent} links={links} createLink={createLink} selectLink={jest.fn()} />
      );
      const graph = component.find(ForceGraph2D);
      const link = graph.props().graphData.links[0];
      graph.props().onLinkClick(link);
      expect(createLink).not.toHaveBeenCalled();
    });
  });

  describe('selected link', () => {
    it('marks the selected link as selected in the array provided to the graph', () => {
      const component = shallow(<Canvas registerCanvasComponent={registerCanvasComponent} links={links} selectedLink={selectedLink} />);
      const graph = component.find(ForceGraph2D);
      const linksProps = graph.props().graphData.links;
      expect(linksProps.find((link) => link.id === selectedLink.id)).toMatchObject({
        selected: true,
      });
    });

    it('unmarks the selected link if undefined is passed as prop', () => {
      const component = shallow(<Canvas registerCanvasComponent={registerCanvasComponent} links={links} selectedLink={selectedLink} />);
      component.setProps({ selectedLink: undefined });
      const graph = component.find(ForceGraph2D);
      const linksProps = graph.props().graphData.links;
      expect(linksProps.find((l) => l.selected)).toBeFalsy();
    });

    it('swaps selected links if a new one is passed', () => {
      const component = shallow(<Canvas registerCanvasComponent={registerCanvasComponent} links={links} selectedLink={selectedLink} />);
      selectedLink = links[0];
      component.setProps({ selectedLink });
      const graph = component.find(ForceGraph2D);
      const linksProps = graph.props().graphData.links;
      expect(linksProps.find((l) => l.selected).id).toEqual(links[0].id);
    });
  });

  describe('select link', () => {
    it('invokes the `selectLink` function with the selected link when a not selected link is clicked', () => {
      const selectLink = jest.fn();
      const component = shallow(<Canvas registerCanvasComponent={registerCanvasComponent} links={links} selectLink={selectLink} />);
      const clickedLink = {
        ...links[0],
        source: {
          id: links[0].source,
        },
        target: {
          id: links[0].target,
        },
        original: links[0],
      };
      const graph = component.find(ForceGraph2D);
      graph.props().onLinkClick(clickedLink);
      expect(selectLink).toHaveBeenCalledWith(links[0]);
    });
  });

  describe('deselect link', () => {
    it('invokes the `deselectLink` function when the selected link is clicked', () => {
      const deselectLink = jest.fn();
      const component = shallow(
        <Canvas registerCanvasComponent={registerCanvasComponent} links={links} selectedLink={selectedLink} deselectLink={deselectLink} />
      );
      const graph = component.find(ForceGraph2D);
      const graphLinks = graph.props().graphData.links;
      graph.props().onLinkClick(graphLinks[1]);
      expect(deselectLink).toHaveBeenCalled();
    });
  });

  describe('artificial links', () => {
    it('creates an artificial link between an unlinked node and another node', () => {
      const unlinkedNode = { id: 'unlinked' };
      const component = shallow(<Canvas nodes={[...nodes, unlinkedNode]} links={links} />);
      const graph = component.find(ForceGraph2D);
      const graphLinks = graph.props().graphData.links;
      expect(graphLinks).toContainEqual(
        expect.objectContaining({
          source: expect.anything(),
          target: 'unlinked',
          artificial: true,
        })
      );
    });

    it('does not create an artificial link if there are no unlinked nodes', () => {
      const component = shallow(<Canvas nodes={nodes} links={links} />);
      const graph = component.find(ForceGraph2D);
      const graphLinks = graph.props().graphData.links;
      expect(graphLinks).not.toContainEqual(
        expect.objectContaining({
          artificial: true,
        })
      );
    });

    it('creates an artificial link between two unlinked nodes if there are no more', () => {
      const unlinkedNodeOne = { id: 'unlinkedNodeOne' };
      const unlinkedNodeTwo = { id: 'unlinkedNodeTwo' };
      const component = shallow(<Canvas nodes={[unlinkedNodeOne, unlinkedNodeTwo]} />);
      const graph = component.find(ForceGraph2D);
      const graphLinks = graph.props().graphData.links;
      expect(graphLinks).toEqual([
        {
          source: 'unlinkedNodeOne',
          target: 'unlinkedNodeTwo',
          artificial: true,
        },
      ]);
    });
  });

  describe('register canvas component', () => {
    it('register the canvas component', () => {
      shallow(<Canvas registerCanvasComponent={registerCanvasComponent} />);
      expect(registerCanvasComponent).toHaveBeenCalled();
    });
  });
});
