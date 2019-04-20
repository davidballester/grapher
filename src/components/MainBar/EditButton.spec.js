import React from 'react';
import { shallow } from 'enzyme';

import EditButton from './EditButton';

describe(EditButton.name, () => {
  let graphName;

  beforeEach(() => {
    graphName = 'foo';
  });

  it('renders without crashing', () => {
    const component = shallow(<EditButton graphName={graphName} />);
    expect(component).toBeDefined();
  });

  it('does not render anything if no graph name is provided', () => {
    const component = shallow(<EditButton />);
    expect(component.type()).toEqual(null);
  });
});
