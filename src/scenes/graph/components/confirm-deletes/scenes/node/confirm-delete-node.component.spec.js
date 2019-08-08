import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import { mount } from 'enzyme';

import ConfirmDeleteNode from './confirm-delete-node.component';

describe(ConfirmDeleteNode.name, () => {
  let isOpen;
  let nodeIds;
  let deleteNodes;
  let cancel;

  beforeEach(() => {
    isOpen = true;
    nodeIds = ['foo', 'bar'];
    deleteNodes = jest.fn();
    cancel = jest.fn();
  });

  it('renders without crashing', () => {
    const component = mount(<ConfirmDeleteNode isOpen={isOpen} nodeIds={nodeIds} deleteNodes={deleteNodes} cancel={cancel} />);
    expect(component).toBeDefined();
  });

  it('sets the dialog `open` prop to `false` if `isOpen` flag is set to `false`', () => {
    const component = mount(<ConfirmDeleteNode isOpen={false} nodeIds={nodeIds} deleteNodes={deleteNodes} cancel={cancel} />);
    const dialog = component.find(Dialog).getElement();
    expect(dialog.props.open).toBeFalsy();
  });

  it('sets the dialog `open` prop to `true` if `isOpen` flag is set to `true`', () => {
    const component = mount(<ConfirmDeleteNode isOpen={true} nodeIds={nodeIds} deleteNodes={deleteNodes} cancel={cancel} />);
    const dialog = component.find(Dialog).getElement();
    expect(dialog.props.open).toBeTruthy();
  });

  it('invokes the `cancel` function when the `cancel` button is clicked', () => {
    const component = mount(<ConfirmDeleteNode isOpen={isOpen} nodeIds={nodeIds} deleteNodes={deleteNodes} cancel={cancel} />);
    component
      .find('[type="button"].cancel')
      .first()
      .simulate('click');
    expect(cancel).toHaveBeenCalled();
  });

  it('invokes the `deleteNodes` function when the `delete` button is clicked', () => {
    const component = mount(<ConfirmDeleteNode isOpen={isOpen} nodeIds={nodeIds} deleteNodes={deleteNodes} cancel={cancel} />);
    component
      .find('[type="button"].delete')
      .first()
      .simulate('click');
    expect(deleteNodes).toHaveBeenCalledWith(nodeIds);
  });
});
