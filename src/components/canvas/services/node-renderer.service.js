import blue from '@material-ui/core/colors/blue';
import orange from '@material-ui/core/colors/orange';

function renderNode(node, ctx, globalScale) {
  if (node.selected) {
    renderSelectedCircle(node, ctx);
  }
  renderCircle(node, ctx);
  renderLabel(node, ctx, globalScale);
}

function renderSelectedCircle(node, ctx) {
  const color = node.color === orange['A200'] ? blue['A200'] : orange['A200'];
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(node.x, node.y, 6, 0, 2 * Math.PI);
  ctx.fill();
}

function renderCircle(node, ctx) {
  const color = node.color || blue['A200'];
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(node.x, node.y, 5, 0, 2 * Math.PI);
  ctx.fill();
}

function renderLabel(node, ctx, globalScale) {
  const fontSize = globalScale;
  ctx.font = `${fontSize}px Sans-Serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#000';
  ctx.fillText(node.id, node.x, node.y + 8);
}

export default renderNode;
