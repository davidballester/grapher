import React from 'react';
import { shallow } from 'enzyme';
import IconButton from '@material-ui/core/IconButton';

import EditButton from './EditButton';

describe(EditButton.name, () => {
  let graphName;
  let openEditGraph;

  beforeEach(() => {
    graphName = 'foo';
    openEditGraph = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders without crashing', () => {
    const component = shallow(<EditButton graphName={graphName} />);
    expect(component).toBeDefined();
  });

  it('does not render anything if no graph name is provided', () => {
    const component = shallow(<EditButton />);
    expect(component.type()).toEqual(null);
  });

  it('passes the `openEditGraph` prop as `onClick` to `IconButton`', () => {
    const component = shallow(<EditButton graphName={graphName} openEditGraph={openEditGraph} />);
    const onClick = component.filter(IconButton).props().onClick;
    expect(onClick).toEqual(openEditGraph);
  });
});
