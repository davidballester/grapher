import React from 'react';
import { shallow } from 'enzyme';

import { App } from './app.component';

describe('App', () => {
  it('renders without crashing', () => {
    const component = shallow(<App />);
    expect(component).toBeDefined();
  });
});
