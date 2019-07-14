import React from 'react';
import PropTypes from 'prop-types';
import ForceGraph2D from 'react-force-graph-2d';
import isEqual from 'lodash/isEqual';

import renderNode from './services/node-renderer.service';
import { getLinkColor } from './services/link-renderer.service';

const nodeProp = PropTypes.shape({
  id: PropTypes.string.isRequired,
});

const linkProp = PropTypes.shape({
  id: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired,
  target: PropTypes.string.isRequired,
});

export default class Canvas extends React.Component {
  static propTypes = {
    nodes: PropTypes.arrayOf(nodeProp),
    links: PropTypes.arrayOf(linkProp),
    className: PropTypes.string,
    openNewNode: PropTypes.func,
    selectNode: PropTypes.func,
    selectedNodes: PropTypes.arrayOf(PropTypes.any),
    createLink: PropTypes.func,
    virtualLink: PropTypes.any,
    openConfirmDeleteNode: PropTypes.func,
    selectedLink: linkProp,
    selectLink: PropTypes.func,
    deselectLink: PropTypes.func,
    openConfirmDeleteLink: PropTypes.func,
    openEditNode: PropTypes.func,
    linksIdsWithOpposite: PropTypes.arrayOf(PropTypes.string),
    registerCanvasComponent: PropTypes.func,
  };

  state = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  constructor(props) {
    super(props);
    this.canvas = undefined;
    this.graphNodesData = [];
    this.graphLinksData = [];
    this.originalZoom = undefined;
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener('resize', this.updateDimensions.bind(this));
    if (!!this.props.registerCanvasComponent) {
      this.props.registerCanvasComponent(this.canvas);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions.bind(this));
  }

  componentDidUpdate() {
    this.setWidth();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !isEqual(nextProps, this.props) || !isEqual(this.state, nextState);
  }

  render() {
    const { className, openNewNode, nodes, links, selectedNodes, virtualLink, selectedLink, linksIdsWithOpposite = [] } = this.props;
    const { height, width } = this.state;
    this.synchronizeGraphData(nodes, links, selectedNodes, virtualLink, selectedLink);
    if (!!this.canvas) {
      this.setZoom();
    }

    return (
      <div
        className={className}
        onDoubleClick={openNewNode}
        tabIndex="0"
        onKeyUp={(evt) => this.handleKey(evt.key)}
        ref={(container) => (this.container = container)}
      >
        <ForceGraph2D
          ref={(canvas) => (this.canvas = canvas)}
          height={height}
          width={width}
          graphData={{ nodes: this.graphNodesData, links: this.graphLinksData }}
          enableNodeDrag={true}
          nodeCanvasObject={renderNode}
          nodeLabel="id"
          linkDirectionalArrowLength={5}
          linkDirectionalArrowRelPos={1}
          linkColor={getLinkColor}
          linkWidth={3}
          linkDirectionalParticles={4}
          linkDirectionalParticleWidth={(link) => (link.selected ? 4 : 0)}
          linkLabel="label"
          linkCurvature={({ id }) => (!!linksIdsWithOpposite.find((linkId) => linkId === id) ? 0.3 : 0)}
          onNodeClick={(node) => this.toggleNodeSelection(node)}
          onLinkClick={(link) => this.linkClick(link)}
        />
      </div>
    );
  }

  handleKey = (key) => {
    switch (key) {
      case 'Backspace':
      case 'Delete':
        this.onDeleteKey();
        break;
      case 'Enter':
        this.onEnterKey();
        break;
      default:
        break;
    }
  };

  onDeleteKey = () => {
    const selectedNodes = this.props.selectedNodes || [];
    const selectedLink = this.props.selectedLink;
    if (!!selectedNodes.length && !selectedLink) {
      this.props.openConfirmDeleteNode(selectedNodes.map((node) => node.id));
    } else if (!selectedNodes.length && !!selectedLink) {
      this.props.openConfirmDeleteLink(selectedLink.id);
    }
  };

  onEnterKey = () => {
    const selectedNodes = this.props.selectedNodes || [];
    if (selectedNodes.length === 1) {
      this.props.openEditNode(selectedNodes[0]);
    }
  };

  synchronizeGraphData = (nodes, links, selectedNodes, virtualLink, selectedLink) => {
    this.synchronizeNodes(nodes);
    this.synchronizeLinks(links);
    if (!!virtualLink) {
      this.addVirtualLink(virtualLink);
    }
    this.markAllNodesAsDeselected();
    this.markNodesAsSelected(selectedNodes);
    this.markLinkAsSelected(selectedLink);
  };

  synchronizeNodes = (nodes = []) => {
    const preservedNodes = this.graphNodesData.map((graphNode) => nodes.find((n) => n.id === graphNode.id)).filter((n) => !!n);
    const newNodes = nodes
      .filter((node) => !this.graphNodesData.find((graphNode) => graphNode.id === node.id))
      .map(({ id, color, groups }) => ({ id, color, groups }));
    this.graphNodesData = [...preservedNodes, ...newNodes];
  };

  synchronizeLinks = (links = []) => {
    this.graphLinksData = links.map((link) => this.toGraphLink(link));
  };

  markNodesAsSelected = (selectedNodes = []) => {
    selectedNodes.forEach((selectedNode) => {
      const node = this.graphNodesData.find((n) => n.id === selectedNode.id);
      node.selected = true;
    });
  };

  markLinkAsSelected = (link) => {
    if (!!link) {
      const graphLink = this.graphLinksData.find((l) => l.id === link.id);
      graphLink.selected = true;
    }
  };

  markAllNodesAsDeselected = () => {
    this.graphNodesData = this.graphNodesData.map((node) => ({ ...node, selected: false }));
  };

  setZoom = () => {
    if (!this.originalZoom) {
      this.originalZoom = this.canvas.zoom();
      this.canvas.zoom(this.originalZoom * 5);
    }
    if (this.graphNodesData.length === 1) {
      this.canvas.zoom(this.originalZoom * 5);
    }
  };

  setWidth = () => {
    if (!!this.container && this.state.width !== this.container.clientWidth) {
      this.setState({
        width: this.container.clientWidth,
      });
    }
  };

  toggleNodeSelection = (node) => {
    const { selectedNodes = [], selectNode = () => {}, deselectNode = () => {}, nodes } = this.props;
    const isSelected = !!selectedNodes.find((n) => n.id === node.id);
    if (isSelected) {
      deselectNode(node.id);
    } else {
      const actualNode = nodes.find((n) => n.id === node.id);
      selectNode(actualNode);
    }
  };

  toGraphLink = (link) => {
    return {
      ...link,
      original: link,
    };
  };

  fromGraphLink = (link) => {
    return link.original;
  };

  addVirtualLink = (virtualLink) => {
    this.graphLinksData = [
      ...this.graphLinksData,
      {
        ...this.toGraphLink(virtualLink),
        virtual: true,
      },
    ];
  };

  linkClick = (link) => {
    const stateLink = this.fromGraphLink(link);
    if (link.virtual) {
      this.props.createLink(stateLink);
    } else if (link.selected) {
      this.props.deselectLink(stateLink);
    } else {
      this.props.selectLink(stateLink);
    }
  };

  updateDimensions = () => {
    const headerHeight = window.innerWidth < 600 ? 60 : 70;
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight - headerHeight,
    });
  };
}
