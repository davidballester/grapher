import React from 'react';
import { shallow } from 'enzyme';
import IconButton from '@material-ui/core/IconButton';

import BackButton from './BackButton';
import { ROUTES } from '../../constants';

jest.mock('../../services/history', () => ({
  goBack: jest.fn(),
}));
// eslint-disable-next-line import/first
import history from '../../services/history';

describe(BackButton.name, () => {
  let location;

  beforeEach(() => {
    location = {
      pathname: '/foo',
    };
  });

  it('renders without crashing', () => {
    const component = shallow(<BackButton location={location} />);
    expect(component).toBeDefined();
  });

  it(`does not render anything if the pathname is '${ROUTES.BASE}'`, () => {
    location.pathname = ROUTES.BASE;
    const component = shallow(<BackButton location={location} />);
    expect(component.type()).toEqual(null);
  });

  it(`does not render anything if the pathname is '${ROUTES.GRAPHS}'`, () => {
    location.pathname = ROUTES.GRAPHS;
    const component = shallow(<BackButton location={location} />);
    expect(component.type()).toEqual(null);
  });

  it('calls the history service goBack function on click', () => {
    const component = shallow(<BackButton location={location} />);
    component.find(IconButton).simulate('click');
    expect(history.goBack).toHaveBeenCalled();
  });
});
