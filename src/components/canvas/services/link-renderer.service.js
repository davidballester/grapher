import blue from '@material-ui/core/colors/blue';
import orange from '@material-ui/core/colors/orange';
import grey from '@material-ui/core/colors/grey';

export function getLinkColor(link) {
  const { virtual = false, selected = false, artificial = false } = link;
  if (virtual) {
    return blue['A200'];
  } else if (selected) {
    return orange['A200'];
  } else if (artificial) {
    return 'rgba(0, 0, 0, 0)';
  } else {
    return grey['300'];
  }
}
