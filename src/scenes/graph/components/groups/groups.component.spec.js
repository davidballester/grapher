import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';

import Groups from './groups.component';
import EmptyState from './components/empty-state.component';
import GroupListItem from './components/group-list-item.component';

describe(Groups.name, () => {
  let shallow;

  beforeEach(() => {
    shallow = createShallow({ dive: true });
  });

  it('renders a list item per group', () => {
    const component = shallow(<Groups groups={[{ id: 'foo' }, { id: 'bar' }]} />);
    expect(component.find(GroupListItem).getElements()).toHaveLength(2);
  });

  it('does not render the empty state if there are groups', () => {
    const component = shallow(<Groups groups={[{ id: 'foo' }]} />);
    expect(component.find(EmptyState).getElements()).toHaveLength(0);
  });

  it('does not render a list item when there are no groups', () => {
    const component = shallow(<Groups />);
    expect(component.find(GroupListItem).getElements()).toHaveLength(0);
  });

  it('renders the empty state if there are no groups', () => {
    const component = shallow(<Groups />);
    expect(component.find(EmptyState).getElements()).toHaveLength(1);
  });
});
