import React from 'react';
import PropTypes from 'prop-types';
import ForceGraph2D from 'react-force-graph-2d';
import blue from '@material-ui/core/colors/blue';
import orange from '@material-ui/core/colors/orange';
import grey from '@material-ui/core/colors/grey';

export default class Canvas extends React.Component {
  static propTypes = {
    nodes: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
      })
    ),
    links: PropTypes.arrayOf(
      PropTypes.shape({
        source: PropTypes.string.isRequired,
        target: PropTypes.string.isRequired,
      })
    ),
    className: PropTypes.string,
    openNewNode: PropTypes.func,
    selectNode: PropTypes.func,
    selectedNodes: PropTypes.arrayOf(PropTypes.any),
    createLink: PropTypes.func,
    virtualLink: PropTypes.any,
    openConfirmDeleteNode: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.canvas = undefined;
    this.graphNodesData = [];
    this.graphLinksData = [];
    this.originalZoom = undefined;
  }

  render() {
    const { className, openNewNode, nodes, links, selectedNodes, virtualLink } = this.props;
    this.synchronizeGraphData(nodes, links, selectedNodes, virtualLink);
    if (!!this.canvas) {
      this.setZoom();
    }

    return (
      <div className={className} onDoubleClick={openNewNode} tabIndex="0" onKeyUp={(evt) => this.handleKey(evt.key)}>
        <ForceGraph2D
          ref={(canvas) => (this.canvas = canvas)}
          graphData={{ nodes: this.graphNodesData, links: this.graphLinksData }}
          nodeRelSize={8}
          linkDirectionalArrowLength={5}
          linkDirectionalArrowRelPos={1}
          enableNodeDrag={true}
          nodeCanvasObject={(node, ctx, globalScale) => this.renderNode(node, ctx, globalScale)}
          linkCanvasObject={(link, ctx, globalScale) => this.renderLink(link, ctx, globalScale)}
          onNodeClick={(node) => this.toggleNodeSelection(node)}
          onLinkClick={(link) => this.createLink(link)}
        />
      </div>
    );
  }

  handleKey = (key) => {
    switch (key) {
      case 'Backspace':
      case 'Delete':
        const selectedNodes = this.props.selectedNodes || [];
        if (!!selectedNodes.length) {
          this.props.openConfirmDeleteNode(selectedNodes.map((node) => node.id));
        }
        break;
      default:
        break;
    }
  };

  synchronizeGraphData = (nodes, links, selectedNodes, virtualLink) => {
    this.synchronizeNodes(nodes);
    this.synchronizeLinks(links);
    if (!!virtualLink) {
      this.addVirtualLink(virtualLink);
    }
    this.markAllNodesAsDeselected();
    this.markNodesAsSelected(selectedNodes);
  };

  synchronizeNodes = (nodes = []) => {
    const preservedNodes = this.graphNodesData.filter((graphNode) => !!nodes.find((n) => n.id === graphNode.id));
    const newNodes = nodes.filter((node) => !this.graphNodesData.find((graphNode) => graphNode.id === node.id)).map(({ id }) => ({ id }));
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

  markAllNodesAsDeselected = () => {
    this.graphNodesData = this.graphNodesData.map((node) => ({ ...node, selected: false }));
  };

  setZoom = () => {
    if (!this.originalZoom) {
      this.originalZoom = this.canvas.zoom();
    }
    this.canvas.zoom(this.originalZoom * 0.8);
  };

  toggleNodeSelection = (node) => {
    const { selectedNodes = [], selectNode, deselectNode, nodes } = this.props;
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
    };
  };

  fromGraphLink = (link) => {
    return {
      id: link.id,
      source: link.source.id,
      target: link.target.id,
    };
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

  createLink = (link) => {
    if (link.virtual) {
      this.props.createLink(this.fromGraphLink(link));
    }
  };

  renderNode = (node, ctx, globalScale) => {
    this.renderCircle(node, ctx);
    this.renderLabel(node, ctx, globalScale);
  };

  renderLink = (link, ctx, globalScale) => {
    const { source, target, virtual = false } = link;
    ctx.strokeStyle = virtual ? orange['A700'] : grey['300'];
    ctx.strokeWidth = 2;
    ctx.beginPath();
    ctx.moveTo(source.x, source.y);
    ctx.lineTo(target.x, target.y);
    ctx.stroke();
  };

  renderCircle = (node, ctx) => {
    const color = node.selected ? orange['A200'] : blue['A200'];
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(node.x, node.y, 8, 0, 2 * Math.PI);
    ctx.fill();
  };

  renderLabel = (node, ctx, globalScale) => {
    const label = node.id;
    const fontSize = 16 / globalScale;

    const textWidth = ctx.measureText(label).width;
    const bckgDimensions = [textWidth + fontSize * 0.2, fontSize * 1.2];
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y + 14 - bckgDimensions[1] / 2, ...bckgDimensions);

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#000';
    ctx.font = `${fontSize}px Sans-Serif`;
    ctx.fillText(node.id, node.x, node.y + 12);
  };
}
