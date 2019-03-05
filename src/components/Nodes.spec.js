import React from 'react';
import { shallow } from 'enzyme';

import Nodes from './Nodes';

describe('Nodes', () => {
  it('renders without crashing', () => {
    const component = shallow(<Nodes nodes={[]} simulation={{}} />);
    expect(component).toBeDefined();
  });
});
