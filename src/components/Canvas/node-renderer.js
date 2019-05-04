import blue from '@material-ui/core/colors/blue';
import orange from '@material-ui/core/colors/orange';

function renderNode(node, ctx, globalScale) {
  renderCircle(node, ctx);
  renderLabel(node, ctx, globalScale);
}

function renderCircle(node, ctx) {
  const color = node.selected ? orange['A200'] : node.color || blue['A200'];
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

export default renderNode;
