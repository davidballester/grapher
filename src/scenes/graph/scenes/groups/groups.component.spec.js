import React from 'react';
import { shallow } from 'enzyme';
import { ListItem } from '@material-ui/core';

import Groups from './groups.component';
import EmptyState from './components/empty-state.component';

describe(Groups.name, () => {
  it('renders a list item per group', () => {
    const component = shallow(<Groups groups={[{ id: 'foo' }, { id: 'bar' }]} />);
    expect(component.find(ListItem).getElements()).toHaveLength(2);
  });

  it('does not render the empty state if there are groups', () => {
    const component = shallow(<Groups groups={[{ id: 'foo' }]} />);
    expect(component.find(EmptyState).getElements()).toHaveLength(0);
  });

  it('does not render a list item when there are no groups', () => {
    const component = shallow(<Groups />);
    expect(component.find(ListItem).getElements()).toHaveLength(0);
  });

  it('renders the empty state if there are no groups', () => {
    const component = shallow(<Groups />);
    expect(component.find(EmptyState).getElements()).toHaveLength(1);
  });
});
