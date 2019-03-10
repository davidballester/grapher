import React from 'react';
import PropTypes from 'prop-types';
import ForceGraph2D from 'react-force-graph-2d';
import blue from '@material-ui/core/colors/blue';
import orange from '@material-ui/core/colors/orange';

export default class Canvas extends React.PureComponent {
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
    selectedNode: PropTypes.any,
  };

  componentDidUpdate() {
    if (!this.originalZoom) {
      this.originalZoom = this.canvas.zoom();
    }
    this.canvas.zoom(this.originalZoom * 0.8);
  }

  render() {
    const { className, nodes = [], links = [], openNewNode, selectNode, selectedNode = {} } = this.props;
    const linksCloned = links.map((link) => ({ ...link }));
    const nodesCloned = nodes.map((node) => ({
      ...node,
      selected: selectedNode.id === node.id,
    }));
    return (
      <div className={className} onDoubleClick={openNewNode}>
        <ForceGraph2D
          ref={(canvas) => (this.canvas = canvas)}
          graphData={{ nodes: nodesCloned, links: linksCloned }}
          nodeRelSize={8}
          linkDirectionalArrowLength={5}
          linkDirectionalArrowRelPos={1}
          enableNodeDrag={true}
          nodeCanvasObject={renderNode}
          onNodeClick={(node) => selectNode(nodes.find((n) => n.id === node.id))}
        />
      </div>
    );
  }
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
