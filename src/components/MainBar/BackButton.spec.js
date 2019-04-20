import React from 'react';
import { shallow } from 'enzyme';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';

import BackButton from './BackButton';

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

  it('does not render anything if the pathname is `/`', () => {
    location.pathname = '/';
    const component = shallow(<BackButton location={location} />);
    expect(component.type()).toEqual(null);
  });

  it('renders an `IconButton` using `Link`', () => {
    const component = shallow(<BackButton location={location} />);
    const iconButtonComponent = component.find(IconButton).props().component;
    expect(iconButtonComponent).toEqual(Link);
  });

  it('passes `to="/"` to the `IconButton`', () => {
    const component = shallow(<BackButton location={location} />);
    const to = component.find(IconButton).props().to;
    expect(to).toEqual('/');
  });
});
