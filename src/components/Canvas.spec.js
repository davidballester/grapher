import React from 'react';
import { shallow } from 'enzyme';

import Canvas from './Canvas';

describe('Canvas', () => {
  it('renders without crashing', () => {
    const component = shallow(<Canvas />);
    expect(component).toBeDefined();
  });
});
