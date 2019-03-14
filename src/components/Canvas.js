import React from 'react';
import PropTypes from 'prop-types';
import ForceGraph2D from 'react-force-graph-2d';
import blue from '@material-ui/core/colors/blue';
import orange from '@material-ui/core/colors/orange';
import grey from '@material-ui/core/colors/grey';
import isEqual from 'lodash/isEqual';

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
  };

  constructor(props) {
    super(props);
    this.nodes = [];
    this.links = [];
    this.originalZoom = undefined;
  }

  componentDidMount() {
    const { selectedNodes = [] } = this.props;
    selectedNodes.forEach((node) => this.selectNode(node));
  }

  shouldComponentUpdate(nextProps) {
    const { nodes: nextNodes, links: nextLinks, selectedNodes: nextSelectedNodes = [] } = nextProps;
    const { nodes, links, selectedNodes = [] } = this.props;
    const shouldUpdate = !isEqual(nodes, nextNodes) || !isEqual(links, nextLinks);
    if (shouldUpdate) {
      this.setZoom();
      return true;
    }
    if (!isEqual(selectedNodes, nextSelectedNodes)) {
      selectedNodes.forEach((node) => this.deselectNode(node));
      nextSelectedNodes.forEach((node) => this.selectNode(node));
    }
    return false;
  }

  render() {
    const { className, nodes = [], links = [], openNewNode } = this.props;
    this.links = links.map((link) => ({ ...link }));
    this.nodes = nodes.map((node) => ({ ...node }));
    this.selectNode(this.props.selectedNode);
    return (
      <div className={className} onDoubleClick={openNewNode}>
        <ForceGraph2D
          ref={(canvas) => (this.canvas = canvas)}
          graphData={{ nodes: this.nodes, links: this.links }}
          nodeRelSize={8}
          linkDirectionalArrowLength={5}
          linkDirectionalArrowRelPos={1}
          enableNodeDrag={true}
          nodeCanvasObject={renderNode}
          linkCanvasObject={renderLink}
          onNodeClick={(node) => this.toggleNodeSelection(node)}
        />
      </div>
    );
  }

  setZoom = () => {
    if (!this.originalZoom) {
      this.originalZoom = this.canvas.zoom();
    }
    this.canvas.zoom(this.originalZoom * 0.8);
  };

  deselectNode = (selectedNode) => {
    if (!!selectedNode) {
      const node = this.nodes.find((n) => n.id === selectedNode.id);
      node.selected = false;
    }
  };

  selectNode = (selectedNode) => {
    if (!!selectedNode) {
      const node = this.nodes.find((n) => n.id === selectedNode.id);
      node.selected = true;
    }
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
}

function renderCircle(node, ctx) {
  const color = node.selected ? orange['A200'] : blue['A200'];
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(node.x, node.y, 8, 0, 2 * Math.PI);
  ctx.fill();
}

function renderLabel(node, ctx, globalScale) {
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
}

function renderNode(node, ctx, globalScale) {
  renderCircle(node, ctx);
  renderLabel(node, ctx, globalScale);
}

function renderLink(link, ctx, globalScale) {
  const { source, target } = link;
  ctx.strokeStyle = grey['300'];
  ctx.strokeWidth = 2;
  ctx.beginPath();
  ctx.moveTo(source.x, source.y);
  ctx.lineTo(target.x, target.y);
  ctx.stroke();
}
