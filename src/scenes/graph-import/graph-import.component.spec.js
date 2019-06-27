import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { shallow } from 'enzyme';

import Import from './graph-import.component';

describe(Import.name, () => {
  let importGraph;
  let close;

  beforeEach(() => {
    importGraph = jest.fn();
    close = jest.fn();
  });

  it('renders without crashing', () => {
    const component = shallow(<Import importGraph={importGraph} close={close} />).dive();
    expect(component).toBeDefined();
  });

  it('renders the dialog open', () => {
    const component = shallow(<Import importGraph={importGraph} close={close} />).dive();
    const dialog = component.find(Dialog).getElement();
    expect(dialog.props.open).toEqual(true);
  });

  it('invokes the close prop if the button of the form is clicked', () => {
    const component = shallow(<Import importGraph={importGraph} close={close} />).dive();
    component.find('[type="button"]').simulate('click');
    expect(close).toHaveBeenCalled();
  });

  it('invokes the import graph prop if the form is submitted', () => {
    const component = shallow(<Import importGraph={importGraph} close={close} />).dive();
    component.find('form').simulate('submit', { preventDefault: jest.fn() });
    expect(importGraph).toHaveBeenCalled();
  });

  describe('errors', () => {
    let errors;

    beforeEach(() => {
      errors = ['foo', 'bar'];
    });

    it('renders a list item per error', () => {
      const component = shallow(<Import errors={errors} importGraph={importGraph} close={close} />).dive();
      expect(component.find(ListItem).getElements().length).toEqual(errors.length);
    });

    it('renders the error text in the list items', () => {
      const component = shallow(<Import errors={errors} importGraph={importGraph} close={close} />).dive();
      const listItemTexts = component.find(ListItemText);
      listItemTexts.forEach((listItemText, index) => {
        expect(listItemText.getElement().props.primary).toEqual(errors[index]);
      });
    });
  });
});
