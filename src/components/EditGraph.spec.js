import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import { mount } from 'enzyme';

import EditGraph from './EditGraph';

describe(EditGraph.name, () => {
  let isOpen;
  let graphName;
  let graphId;
  let setGraphName;
  let cancelEditGraph;

  beforeEach(() => {
    isOpen = true;
    graphName = 'foo';
    graphId = 'qux';
    setGraphName = jest.fn();
    cancelEditGraph = jest.fn();
  });

  it('renders without crashing', () => {
    const component = mount(
      <EditGraph isOpen={isOpen} graphName={graphName} graphId={graphId} setGraphName={setGraphName} cancelEditGraph={cancelEditGraph} />
    );
    expect(component).toBeDefined();
  });

  it('sets the dialog `open` prop to `false` if `isOpen` flag is set to `false`', () => {
    const component = mount(
      <EditGraph isOpen={false} graphName={graphName} graphId={graphId} setGraphName={setGraphName} cancelEditGraph={cancelEditGraph} />
    );
    const dialog = component.find(Dialog).getElement();
    expect(dialog.props.open).toBeFalsy();
  });

  it('sets the dialog `open` prop to `true` if `isOpen` flag is set to `true`', () => {
    const component = mount(
      <EditGraph isOpen={true} graphName={graphName} graphId={graphId} setGraphName={setGraphName} cancelEditGraph={cancelEditGraph} />
    );
    const dialog = component.find(Dialog).getElement();
    expect(dialog.props.open).toBeTruthy();
  });

  it('invokes the `cancelEditGraph` function when the `cancel` button is clicked', () => {
    const component = mount(
      <EditGraph isOpen={isOpen} graphName={graphName} graphId={graphId} setGraphName={setGraphName} cancelEditGraph={cancelEditGraph} />
    );
    component.find('Button.cancel').simulate('click');
    expect(cancelEditGraph).toHaveBeenCalled();
  });
});
