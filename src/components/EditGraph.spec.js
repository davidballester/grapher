import React from 'react';
import { shallow } from 'enzyme';

import EditGraph from './EditGraph';

describe(EditGraph.name, () => {
  let loadGraph;

  beforeEach(() => {
    loadGraph = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders without crashing', () => {
    const component = shallow(<EditGraph loadGraph={loadGraph} />);
    expect(component).toBeDefined();
  });

  it('does not invoke `loadGraph` if `graphId` is not provided', () => {
    shallow(<EditGraph loadGraph={loadGraph} />);
    expect(loadGraph).not.toHaveBeenCalled();
  });

  it('does not invoke `loadGraph` if `graphId` is equal to `loadedGraphId`', () => {
    shallow(<EditGraph loadGraph={loadGraph} graphId={'foo'} loadedGraphId={'foo'} />);
    expect(loadGraph).not.toHaveBeenCalled();
  });

  it('invokes `loadGraph` with `graphId`', () => {
    shallow(<EditGraph loadGraph={loadGraph} graphId={'foo'} loadedGraphId={'bar'} />);
    expect(loadGraph).toHaveBeenCalledWith('foo');
  });
});
