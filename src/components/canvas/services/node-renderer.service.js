import * as color from 'color';
import _lget from 'lodash/get';

export function getNodeColor(node, theme) {
  const nodeColor = node.color || _lget(theme, 'palette.secondary.light');
  return color(nodeColor)
    .alpha(1.0)
    .hex();
}

export function renderNode(node, ctx, globalScale, theme) {
  renderGroups(node, ctx);
  if (node.selected) {
    renderSelectedCircle(node, ctx, theme);
  }
  renderLabel(node, ctx, globalScale, theme);
}

function renderSelectedCircle(node, ctx, theme) {
  ctx.save();
  const nodeColor = getNodeColor(node, theme);
  const circleColor = color(nodeColor)
    .lighten(0.4)
    .alpha(1.0)
    .hex();
  const radius = (node.groups || []).length > 0 ? 7 : 6;
  ctx.strokeStyle = circleColor;
  ctx.fillStyle = circleColor;
  ctx.beginPath();
  ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI);
  ctx.fill();
  ctx.restore();
}

function renderLabel(node, ctx, globalScale, theme) {
  const fontSize = globalScale;
  ctx.font = `${fontSize}px Sans-Serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = theme.palette.text.secondary;
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
