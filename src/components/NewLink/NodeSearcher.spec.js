import React from 'react';
import Select from 'react-select';
import { mount } from 'enzyme';

import NodeSearcher from './NodeSearcher';

describe(NodeSearcher.name, () => {
  it('renders without crashing', () => {
    const component = mount(<NodeSearcher />);
    expect(component).toBeDefined();
  });

  it('passes the supplied nodes ids as label value pairs to the select', () => {
    const nodesIds = ['foo', 'bar'];
    const expectedNodesIds = [
      {
        label: 'foo',
        value: 'foo',
      },
      {
        label: 'bar',
        value: 'bar',
      },
    ];
    const component = mount(<NodeSearcher nodesIds={nodesIds} />);
    const select = component.find(Select).getElement();
    expect(select.props.options).toEqual(expectedNodesIds);
  });

  it('invokes the onChange with the supplied value', () => {
    const onChange = jest.fn();
    const component = mount(<NodeSearcher onChange={onChange} />);
    const select = component.find(Select).getElement();
    select.props.onChange({ value: 'foo' });
    expect(onChange).toHaveBeenCalledWith('foo');
  });
});
