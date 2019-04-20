import React from 'react';
import { mount } from 'enzyme';

import Title from './Title';

describe(Title.name, () => {
  let location;
  let graphName;

  beforeEach(() => {
    location = {
      pathname: '/',
    };
    graphName = 'Foo';
  });

  it('renders without crashing', () => {
    const component = mount(<Title location={location} graphName={graphName} />);
    expect(component).toBeDefined();
  });

  it('renders `Grapher` if pathname is `/`', () => {
    const component = mount(<Title location={location} graphName={graphName} />);
    expect(component.text().trim()).toEqual('Grapher');
  });

  it('renders `New graph` if pathname is `/new`', () => {
    location.pathname = '/new';
    const component = mount(<Title location={location} graphName={graphName} />);
    expect(component.text().trim()).toEqual('New graph');
  });

  it('renders the graph name if pathname is neither `/` nor `/new`', () => {
    location.pathname = '/graphs/Foo';
    const component = mount(<Title location={location} graphName={graphName} />);
    expect(component.text().trim()).toEqual(graphName);
  });
});
