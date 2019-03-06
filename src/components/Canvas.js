import React from 'react';
import PropTypes from 'prop-types';
import ForceGraph2D from 'react-force-graph-2d';
import blue from '@material-ui/core/colors/blue';

function renderCircle(node, ctx) {
  ctx.strokeStyle = blue['A200'];
  ctx.fillStyle = blue['A200'];
  ctx.beginPath();
  ctx.arc(node.x, node.y, 8, 0, 2 * Math.PI);
  ctx.fill();
}

function renderNode(node, ctx) {
  renderCircle(node, ctx);
}

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
  };

  render() {
    const { className, nodes = [], links = [] } = this.props;
    return (
      <div className={className}>
        <ForceGraph2D
          graphData={{ nodes, links }}
          nodeRelSize={8}
          linkDirectionalArrowLength={5}
          linkDirectionalArrowRelPos={1}
          enableNodeDrag={true}
          nodeCanvasObject={renderNode}
        />
      </div>
    );
  }
}
