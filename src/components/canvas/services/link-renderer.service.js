import orange from '@material-ui/core/colors/orange';
import grey from '@material-ui/core/colors/grey';
import _get from 'lodash/get';
import { default as Bezier } from 'bezier-js';

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

export function renderLink(link, ctx, globalScale, links) {
  if (!!link.label) {
    const fontSize = globalScale * 0.8;
    ctx.font = `${fontSize}px Sans-Serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#666';
    const { x, y } = getLabelPosition(link, links);
    ctx.fillText(link.label, x, y);
  }
}

function getLabelPosition(link, links) {
  const { source, target } = link;
  if (source.id === target.id) {
    return getSelfLinkPosition(link);
  }
  if (!!findOppositeLabelledLink(link, links)) {
    return getCurvedLinkPosition(link);
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

function getCurvedLinkPosition({ source, target, __controlPoints: controlPoints }) {
  if (!controlPoints || !controlPoints.length) {
    return {
      x: (source.x + target.x) / 2,
      y: (source.y + target.y) / 2,
    };
  }
  const bzLine = new Bezier(source.x, source.y, ...controlPoints, target.x, target.y);
  return bzLine.get(0.6);
}

function findOppositeLabelledLink(link, links) {
  return links.find(({ id, source, target, label }) => id !== link.id && !!label && source.id === link.target.id && target.id === link.source.id);
}
