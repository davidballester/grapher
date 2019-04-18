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

  it('does not invoke `loadGraph` if `graphName` is not provided', () => {
    shallow(<EditGraph loadGraph={loadGraph} />);
    expect(loadGraph).not.toHaveBeenCalled();
  });

  it('does not invoke `loadGraph` if `graphName` is equal to `loadedGraphName`', () => {
    shallow(<EditGraph loadGraph={loadGraph} graphName={'foo'} loadedGraphName={'foo'} />);
    expect(loadGraph).not.toHaveBeenCalled();
  });

  it('invokes `loadGraph` with `graphName`', () => {
    shallow(<EditGraph loadGraph={loadGraph} graphName={'foo'} loadedGraphName={'bar'} />);
    expect(loadGraph).toHaveBeenCalledWith('foo');
  });
});
