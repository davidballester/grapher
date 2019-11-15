import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';

import Graph from './graph.component';
import NotFound from './components/not-found.component';

describe(Graph.name, () => {
  let shallow;
  let loadGraph;

  beforeEach(() => {
    loadGraph = jest.fn();
    shallow = createShallow();
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

  it('returns the NotFound component if the loadError prop is true', () => {
    const component = shallow(<Graph loadGraph={loadGraph} graphId={'foo'} loadedGraphId={'bar'} loadError={true} />);
    expect(component.find(NotFound).getElement()).toBeDefined();
  });
});
