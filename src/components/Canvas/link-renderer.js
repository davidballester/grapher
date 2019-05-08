import blue from '@material-ui/core/colors/blue';
import orange from '@material-ui/core/colors/orange';
import grey from '@material-ui/core/colors/grey';

export function getLinkColor(link) {
  const { virtual = false, selected = false } = link;
  if (virtual) {
    return blue['A200'];
  } else if (selected) {
    return orange['A200'];
  } else {
    return grey['300'];
  }
}

export function renderLink(link, ctx, globalScale) {
  renderLine(link, ctx);
  renderLabel(link, ctx, globalScale);
}

function renderLine(link, ctx) {
  const { source, target } = link;
  const linkColor = getLinkColor(link);
  const strokeStyle = linkColor;
  ctx.strokeStyle = strokeStyle;
  ctx.strokeWidth = 3;
  ctx.beginPath();
  ctx.moveTo(source.x, source.y);
  ctx.lineTo(target.x, target.y);
  ctx.stroke();
}

function renderLabel(link, ctx, globalScale) {
  const { source, target, label } = link;
  if (!!label) {
    const fontSize = globalScale;

    const halfX = (source.x + target.x) / 2;
    const halfY = (source.y + target.y) / 2;

    ctx.font = `${fontSize}px Sans-Serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = getLabelColor(link);
    ctx.fillText(label, halfX, halfY);

    if (link.selected) {
      const lineWidth = ctx.lineWidth;
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 0.2;
      ctx.strokeText(label, halfX, halfY);
      ctx.lineWidth = lineWidth;
    }
  }
}

function getLabelColor(link) {
  const { virtual = false, selected = false } = link;
  if (virtual) {
    return blue['A400'];
  } else if (selected) {
    return orange['A700'];
  } else {
    return grey['500'];
  }
}
