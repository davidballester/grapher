import React from 'react';
import { shallow } from 'enzyme';

import Links from './Links';

describe('Links', () => {
  it('renders without crashing', () => {
    const component = shallow(<Links links={[]} />);
    expect(component).toBeDefined();
  });
});
