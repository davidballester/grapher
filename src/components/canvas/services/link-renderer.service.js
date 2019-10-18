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
