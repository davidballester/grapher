import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import Dialog from '@material-ui/core/Dialog';
import { shallow } from 'enzyme';

import GraphList from './GraphList';

describe('GraphList', () => {
  it('renders without crashing', () => {
    const component = shallow(<GraphList graphNames={[]} isOpen={true} />);
    expect(component).toBeDefined();
  });

  it('renders one list item per graph name plus an additional one', () => {
    const graphNames = ['foo', 'bar', 'baz'];
    const component = shallow(<GraphList graphNames={graphNames} isOpen={true} />);
    expect(component.find(ListItem).getElements()).toHaveLength(graphNames.length + 1);
  });

  it('renders a list item when there are no graph names', () => {
    const component = shallow(<GraphList graphNames={[]} isOpen={true} />);
    expect(component.find(ListItem).getElements()).toHaveLength(1);
  });

  it('renders the graph names in the list items', () => {
    const graphNames = ['foo', 'bar', 'baz'];
    const component = shallow(<GraphList graphNames={graphNames} isOpen={true} />);
    const elements = component.find(ListItem);
    graphNames.forEach((graphName) => {
      const element = elements.find((element) => element.text().match(new RegExp(graphName, 'i')));
      expect(element).toBeDefined();
    });
  });

  it('sets the dialog `open` prop to `false` if `isOpen` flag is set to `false`', () => {
    const component = shallow(<GraphList graphNames={[]} isOpen={false} />);
    const dialog = component.find(Dialog).getElement();
    expect(dialog.props.open).toBeFalsy();
  });

  it('sets the dialog `open` prop to `true` if `isOpen` flag is set to `false`', () => {
    const component = shallow(<GraphList graphNames={[]} isOpen={true} />);
    const dialog = component.find(Dialog).getElement();
    expect(dialog.props.open).toBeTruthy();
  });
});
