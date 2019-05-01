import React from 'react';
import { shallow } from 'enzyme';

import ToggleColorPicker from './ToggleColorPicker';

describe(ToggleColorPicker.name, () => {
  it('renders without crashing', () => {
    const component = shallow(<ToggleColorPicker onChange={jest.fn()} />);
    expect(component).toBeDefined();
  });
});
