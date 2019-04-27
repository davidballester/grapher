import React from 'react';
import { shallow } from 'enzyme';

import Graph from './Graph';

describe(Graph.name, () => {
  let loadGraph;

  beforeEach(() => {
    loadGraph = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders without crashing', () => {
    const component = shallow(<Graph loadGraph={loadGraph} />);
    expect(component).toBeDefined();
  });

  it('does not invoke `loadGraph` if `graphId` is not provided', () => {
    shallow(<Graph loadGraph={loadGraph} />);
    expect(loadGraph).not.toHaveBeenCalled();
  });

  it('does not invoke `loadGraph` if `graphId` is equal to `loadedGraphId`', () => {
    shallow(<Graph loadGraph={loadGraph} graphId={'foo'} loadedGraphId={'foo'} />);
    expect(loadGraph).not.toHaveBeenCalled();
  });

  it('invokes `loadGraph` with `graphId`', () => {
    shallow(<Graph loadGraph={loadGraph} graphId={'foo'} loadedGraphId={'bar'} />);
    expect(loadGraph).toHaveBeenCalledWith('foo');
  });
});
