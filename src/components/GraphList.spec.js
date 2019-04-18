import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import Dialog from '@material-ui/core/Dialog';
import { shallow } from 'enzyme';

import GraphList from './GraphList';

describe('GraphList', () => {
  it('renders without crashing', () => {
    const component = shallow(<GraphList graphNames={[]} />);
    expect(component).toBeDefined();
  });

  it('renders one list item per graph name plus an additional one', () => {
    const graphNames = ['foo', 'bar', 'baz'];
    const component = shallow(<GraphList graphNames={graphNames} />);
    expect(component.find(ListItem).getElements()).toHaveLength(graphNames.length + 1);
  });

  it('renders a list item when there are no graph names', () => {
    const component = shallow(<GraphList graphNames={[]} />);
    expect(component.find(ListItem).getElements()).toHaveLength(1);
  });

  it('renders the graph names in the list items', () => {
    const graphNames = ['foo', 'bar', 'baz'];
    const component = shallow(<GraphList graphNames={graphNames} />);
    const elements = component.find(ListItem);
    graphNames.forEach((graphName) => {
      const element = elements.find((element) => element.text().match(new RegExp(graphName, 'i')));
      expect(element).toBeDefined();
    });
  });

  it('sets the dialog `open` prop to `true`', () => {
    const component = shallow(<GraphList graphNames={[]} />);
    const dialog = component.find(Dialog).getElement();
    expect(dialog.props.open).toBeTruthy();
  });

  it('calls the `openNewGraph` prop when the only list item rendered if no graph names are provided is clicked', () => {
    const openNewGraph = jest.fn();
    const component = shallow(<GraphList graphNames={[]} openNewGraph={openNewGraph} />);
    component
      .find(ListItem)
      .first()
      .simulate('click');
    expect(openNewGraph).toHaveBeenCalled();
  });

  it('calls the `openGraph` prop when a list item is clicked', () => {
    const openGraph = jest.fn();
    const graphName = 'foo';
    const component = shallow(<GraphList graphNames={[graphName]} openGraph={openGraph} />);
    component
      .find(ListItem)
      .first()
      .simulate('click');
    expect(openGraph).toHaveBeenCalledWith(graphName);
  });
});
