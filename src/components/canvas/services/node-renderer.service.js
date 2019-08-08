import blue from '@material-ui/core/colors/blue';
import orange from '@material-ui/core/colors/orange';

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
  const color = node.color === orange['A200'] ? blue['A200'] : orange['A200'];
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(node.x, node.y, 6, 0, 2 * Math.PI);
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
