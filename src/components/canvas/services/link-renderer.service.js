import _get from 'lodash/get';
import { default as Bezier } from 'bezier-js';

export function getLinkColor(link, theme) {
  const groupColor = _get(link, 'groups[0].color');
  if (!!groupColor) {
    return groupColor;
  }

  const { selected = false, artificial = false } = link;
  if (selected) {
    return _get(theme, 'palette.primary.light');
  } else if (artificial) {
    return _get(theme, 'palette.background.default');
  } else {
    return _get(theme, 'palette.text.secondary');
  }
}

export function renderLink(link, ctx, globalScale, links, theme) {
  if (!!link.label) {
    const fontSize = globalScale * 0.6;
    ctx.font = `${fontSize}px Sans-Serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const { x, y } = getLabelPosition(link, links);
    let { width: rectWidth } = ctx.measureText(link.label);
    rectWidth += fontSize / 2;
    const rectHeight = fontSize * 1.2;

    ctx.beginPath();
    ctx.rect(x - rectWidth / 2, y - rectHeight / 2, rectWidth, rectHeight);
    ctx.fillStyle = _get(theme, 'palette.background.paper');
    ctx.fill();

    ctx.fillStyle = _get(theme, 'palette.text.secondary');
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
