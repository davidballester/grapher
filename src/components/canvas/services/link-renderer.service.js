import orange from '@material-ui/core/colors/orange';
import grey from '@material-ui/core/colors/grey';
import _get from 'lodash/get';

export function getLinkColor(link) {
  const groupColor = _get(link, 'groups[0].color');
  if (!!groupColor) {
    return groupColor;
  }

  const { selected = false, artificial = false } = link;
  if (selected) {
    return orange['A200'];
  } else if (artificial) {
    return 'rgba(0, 0, 0, 0)';
  } else {
    return grey['300'];
  }
}

export function renderLink(link, ctx, globalScale) {
  if (!!link.label) {
    const fontSize = globalScale * 0.8;
    ctx.font = `${fontSize}px Sans-Serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#666';
    const { x, y } = getLabelPosition(link);
    ctx.fillText(link.label, x, y);
  }
}

function getLabelPosition(link) {
  const { source, target } = link;
  if (source.id === target.id) {
    return getSelfLinkPosition(link);
  }
  return {
    x: (source.x + target.x) / 2,
    y: (source.y + target.y) / 2,
  };
}

function getSelfLinkPosition(link) {
  const { source } = link;
  return {
    x: source.x + 5,
    y: source.y - 10,
  };
}
