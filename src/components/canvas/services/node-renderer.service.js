import blue from '@material-ui/core/colors/blue';
import * as color from 'color';

export function getNodeColor(node) {
  const nodeColor = node.color;
  return nodeColor || blue['A200'];
}

export function renderNode(node, ctx, globalScale) {
  if (node.selected) {
    renderSelectedCircle(node, ctx);
  }
  renderGroups(node, ctx);
  renderLabel(node, ctx, globalScale);
}

function renderSelectedCircle(node, ctx) {
  ctx.save();
  const nodeColor = getNodeColor(node);
  const circleColor = color(nodeColor)
    .lighten(0.4)
    .hex();
  const radius = (node.groups || []).length > 0 ? 7 : 6;
  ctx.strokeStyle = circleColor;
  ctx.fillStyle = circleColor;
  ctx.beginPath();
  ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI);
  ctx.fill();
  ctx.restore();
}

function renderLabel(node, ctx, globalScale) {
  const fontSize = globalScale;
  ctx.font = `${fontSize}px Sans-Serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#000';
  ctx.fillText(node.id, node.x, node.y + 8);
}

function renderGroups(node, ctx) {
  const { groups = [] } = node;
  if (!groups.length) {
    return;
  }
  const sliceAngle = (Math.PI * 2) / groups.length;
  ctx.save();
  groups.forEach((group, index) => {
    ctx.beginPath();
    ctx.strokeStyle = group.color;
    ctx.lineWidth = 4;
    ctx.arc(node.x, node.y, 3, index * sliceAngle, (index + 1) * sliceAngle);
    ctx.stroke();
  });
  ctx.restore();
}
