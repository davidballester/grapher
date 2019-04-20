import React from 'react';
import { mount } from 'enzyme';

import Title from './Title';
import { ROUTES } from '../../constants';

describe(Title.name, () => {
  let location;
  let graphName;

  beforeEach(() => {
    location = {
      pathname: ROUTES.BASE,
    };
    graphName = 'Foo';
  });

  it('renders without crashing', () => {
    const component = mount(<Title location={location} graphName={graphName} />);
    expect(component).toBeDefined();
  });

  it(`renders 'Grapher' if pathname is '${ROUTES.BASE}'`, () => {
    const component = mount(<Title location={location} graphName={graphName} />);
    expect(component.text().trim()).toEqual('Grapher');
  });

  it(`renders 'Grapher' if pathname is '${ROUTES.GRAPHS}'`, () => {
    location.pathname = ROUTES.GRAPHS;
    const component = mount(<Title location={location} graphName={graphName} />);
    expect(component.text().trim()).toEqual('Grapher');
  });

  it(`renders 'New graph' if pathname is '${ROUTES.NEW_GRAPH}'`, () => {
    location.pathname = ROUTES.NEW_GRAPH;
    const component = mount(<Title location={location} graphName={graphName} />);
    expect(component.text().trim()).toEqual('New graph');
  });

  it(`renders the graph name if pathname is not '${ROUTES.BASE}', ${ROUTES.GRAPHS} or ${ROUTES.NEW_GRAPH}`, () => {
    location.pathname = '/foo';
    const component = mount(<Title location={location} graphName={graphName} />);
    expect(component.text().trim()).toEqual(graphName);
  });
});
