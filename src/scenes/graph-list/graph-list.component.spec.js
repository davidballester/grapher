import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import Dialog from '@material-ui/core/Dialog';
import { shallow } from 'enzyme';

import GraphList from './graph-list.component';

describe('GraphList', () => {
  let graphNames;

  beforeEach(() => {
    graphNames = [['1', 'foo'], ['2', 'bar'], ['3', 'baz']];
  });

  it('renders without crashing', () => {
    const component = shallow(<GraphList graphNames={[]} />);
    expect(component).toBeDefined();
  });

  it('renders one list item per graph name plus two additional ones', () => {
    const component = shallow(<GraphList graphNames={graphNames} />);
    expect(component.find(ListItem).getElements()).toHaveLength(graphNames.length + 2);
  });

  it('renders two list items when there are no graph names', () => {
    const component = shallow(<GraphList graphNames={[]} />);
    expect(component.find(ListItem).getElements()).toHaveLength(2);
  });

  it('renders the graph names in the list items', () => {
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

  it('calls the `openNewGraph` prop when the new graph list item rendered is clicked', () => {
    const openNewGraph = jest.fn();
    const component = shallow(<GraphList graphNames={[]} openNewGraph={openNewGraph} />);
    component.find('.open-new-graph').simulate('click');
    expect(openNewGraph).toHaveBeenCalled();
  });

  it('calls the `openImportGraph` prop when the import graph list item rendered is clicked', () => {
    const openImportGraph = jest.fn();
    const component = shallow(<GraphList graphNames={[]} openImportGraph={openImportGraph} />);
    component.find('.open-import-graph').simulate('click');
    expect(openImportGraph).toHaveBeenCalled();
  });

  it('calls the `openGraph` prop when a list item is clicked', () => {
    const openGraph = jest.fn();
    const component = shallow(<GraphList graphNames={graphNames} openGraph={openGraph} />);
    component
      .find(ListItem)
      .first()
      .simulate('click');
    expect(openGraph).toHaveBeenCalledWith(graphNames[0][0]);
  });
});
