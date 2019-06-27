import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import { mount } from 'enzyme';

import ConfirmDeleteGraph from './confirm-delete-graph.component';

describe(ConfirmDeleteGraph.name, () => {
  let isOpen;
  let graphName;
  let graphId;
  let deleteGraph;
  let cancel;

  beforeEach(() => {
    isOpen = true;
    graphName = 'foo';
    graphId = 'bar';
    deleteGraph = jest.fn();
    cancel = jest.fn();
  });

  it('renders without crashing', () => {
    const component = mount(<ConfirmDeleteGraph isOpen={isOpen} graphName={graphName} graphId={graphId} deleteGraph={deleteGraph} cancel={cancel} />);
    expect(component).toBeDefined();
  });

  it('sets the dialog `open` prop to `false` if `isOpen` flag is set to `false`', () => {
    const component = mount(<ConfirmDeleteGraph isOpen={false} graphName={graphName} graphId={graphId} deleteGraph={deleteGraph} cancel={cancel} />);
    const dialog = component.find(Dialog).getElement();
    expect(dialog.props.open).toBeFalsy();
  });

  it('sets the dialog `open` prop to `true` if `isOpen` flag is set to `true`', () => {
    const component = mount(<ConfirmDeleteGraph isOpen={true} graphName={graphName} graphId={graphId} deleteGraph={deleteGraph} cancel={cancel} />);
    const dialog = component.find(Dialog).getElement();
    expect(dialog.props.open).toBeTruthy();
  });

  it('invokes the `cancel` function when the `cancel` button is clicked', () => {
    const component = mount(<ConfirmDeleteGraph isOpen={isOpen} graphName={graphName} graphId={graphId} deleteGraph={deleteGraph} cancel={cancel} />);
    component
      .find('[type="button"].cancel')
      .first()
      .simulate('click');
    expect(cancel).toHaveBeenCalled();
  });

  it('invokes the `deleteGraph` function when the `delete` button is clicked', () => {
    const component = mount(<ConfirmDeleteGraph isOpen={isOpen} graphName={graphName} graphId={graphId} deleteGraph={deleteGraph} cancel={cancel} />);
    component
      .find('[type="button"].delete')
      .first()
      .simulate('click');
    expect(deleteGraph).toHaveBeenCalledWith(graphId);
  });
});
