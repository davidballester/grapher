import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { shallow } from 'enzyme';

import NewGraph from './new-graph.component';

describe(NewGraph.name, () => {
  let title;
  let cancelNewGraph;
  let saveNewGraph;
  let submitEvent;

  beforeEach(() => {
    title = 'Lorem ipsum';
    cancelNewGraph = jest.fn();
    saveNewGraph = jest.fn();
    submitEvent = {
      preventDefault: jest.fn(),
    };
  });

  it('renders without crashing', () => {
    const component = shallow(<NewGraph title={title} cancelNewGraph={cancelNewGraph} saveNewGraph={saveNewGraph} />);
    expect(component).toBeDefined();
  });

  it('renders `title` prop as `DialogTitle`', () => {
    const component = shallow(<NewGraph title={title} cancelNewGraph={cancelNewGraph} saveNewGraph={saveNewGraph} />);
    const dialogTitle = component.find(DialogTitle);
    expect(dialogTitle.props().children).toEqual(title);
  });

  it('invokes the `cancelNewGraph` function when the `cancel` button is clicked', () => {
    const component = shallow(<NewGraph title={title} cancelNewGraph={cancelNewGraph} saveNewGraph={saveNewGraph} />);
    component.find('.cancel').simulate('click');
    expect(cancelNewGraph).toHaveBeenCalled();
  });

  // Hooks won't trigger re-render on enzyme's shallow render: https://github.com/airbnb/enzyme/issues/1938
  xit('does not invoke the `saveNewGraph` if the text input is empty', () => {
    const component = shallow(<NewGraph title={title} cancelNewGraph={cancelNewGraph} saveNewGraph={saveNewGraph} />);
    const textField = component.find(TextField);
    textField.simulate('change', { target: { value: '' } });
    component
      .find('form')
      .props()
      .onSubmit(submitEvent);
    expect(saveNewGraph).not.toHaveBeenCalled();
  });

  // Hooks won't trigger re-render on enzyme's shallow render: https://github.com/airbnb/enzyme/issues/1938
  xit('sets the `error` prop of the `TextInput` to `true` if the submit button is clicked with an empty input', () => {
    const component = shallow(<NewGraph title={title} cancelNewGraph={cancelNewGraph} saveNewGraph={saveNewGraph} />);
    const textField = component.find(TextField);
    textField.simulate('change', { target: { value: '' } });
    component
      .find('form')
      .props()
      .onSubmit(submitEvent);
    expect(textField.props().error).toBeTruthy();
  });

  xit('invokes the `saveNewGraph` with the input established when clicking the submit button', () => {
    const input = 'foo';
    const component = shallow(<NewGraph title={title} cancelNewGraph={cancelNewGraph} saveNewGraph={saveNewGraph} />);
    const textField = component.find(TextField);
    textField.simulate('change', { target: { value: input } });
    component
      .find('form')
      .props()
      .onSubmit(submitEvent);
    expect(saveNewGraph).toHaveBeenCalledWith(input);
  });

  it('sets the dialog `open` prop to `true`', () => {
    const component = shallow(<NewGraph title={title} cancelNewGraph={cancelNewGraph} saveNewGraph={saveNewGraph} />);
    const dialog = component.find(Dialog).getElement();
    expect(dialog.props.open).toBeTruthy();
  });
});