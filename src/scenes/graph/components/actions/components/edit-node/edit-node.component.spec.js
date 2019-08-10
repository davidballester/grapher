import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import { createShallow } from '@material-ui/core/test-utils';
import { Formik } from 'formik';

import EditNode from './edit-node.component';

describe(EditNode.name, () => {
  let shallow;
  let isOpen;
  let node;
  let save;
  let cancel;

  beforeEach(() => {
    shallow = createShallow({ dive: true });
    isOpen = true;
    node = {
      id: 'foo',
    };
    save = jest.fn();
    cancel = jest.fn();
  });

  it('renders without crashing', () => {
    const component = shallow(<EditNode title="Foo" isOpen={isOpen} node={node} save={save} cancel={cancel} />);
    expect(component).toBeDefined();
  });

  it('uses the title as dialog title', () => {
    const component = shallow(<EditNode title="Foo" isOpen={isOpen} node={node} save={save} cancel={cancel} />);
    const dialogTitle = component.find(DialogTitle).getElement();
    expect(dialogTitle.props.children).toEqual('Foo');
  });

  it('sets the dialog `open` prop to `false` if `isOpen` flag is set to `false`', () => {
    const component = shallow(<EditNode title="Foo" isOpen={false} node={node} save={save} cancel={cancel} />);
    const dialog = component.find(Dialog).getElement();
    expect(dialog.props.open).toBeFalsy();
  });

  it('sets the dialog `open` prop to `true` if `isOpen` flag is set to `true`', () => {
    const component = shallow(<EditNode title="Foo" isOpen={true} node={node} save={save} cancel={cancel} />);
    const dialog = component.find(Dialog).getElement();
    expect(dialog.props.open).toBeTruthy();
  });

  it('invokes the `cancel` function when the `cancel` button is clicked', () => {
    const component = shallow(<EditNode title="Foo" isOpen={isOpen} node={node} save={save} cancel={cancel} />);
    component
      .find(Formik)
      .dive()
      .find('[type="button"].cancel')
      .first()
      .simulate('click');
    expect(cancel).toHaveBeenCalled();
  });
});
