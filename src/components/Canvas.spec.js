import React from 'react';
import { shallow } from 'enzyme';

import Canvas from './Canvas';

describe('Canvas', () => {
  it('renders without crashing', () => {
    const component = shallow(<Canvas />);
    expect(component).toBeDefined();
  });

  it('invokes `openNewNode` on double click over the containing div', () => {
    const openNewNode = jest.fn();
    const className = 'container';
    const component = shallow(<Canvas openNewNode={openNewNode} className={className} />);
    const container = component.find(`.${className}`);
    container.simulate('doubleClick');
    expect(openNewNode).toHaveBeenCalled();
  });
});
