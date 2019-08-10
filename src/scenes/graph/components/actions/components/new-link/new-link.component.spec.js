import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import { createShallow } from '@material-ui/core/test-utils';
import { Formik } from 'formik';

import NewLink from './new-link.component';

describe(NewLink.name, () => {
  let shallow;
  let isOpen;
  let saveNewLink;
  let cancelNewLink;
  let nodesIds;

  beforeEach(() => {
    shallow = createShallow({ dive: true });
    isOpen = true;
    saveNewLink = jest.fn();
    cancelNewLink = jest.fn();
    nodesIds = [];
  });

  it('renders without crashing', () => {
    const component = shallow(<NewLink isOpen={isOpen} saveNewLink={saveNewLink} cancelNewLink={cancelNewLink} nodesIds={nodesIds} />);
    expect(component).toBeDefined();
  });

  it('sets the dialog `open` prop to `false` if `isOpen` flag is set to `false`', () => {
    const component = shallow(<NewLink isOpen={false} saveNewLink={saveNewLink} cancelNewLink={cancelNewLink} nodesIds={nodesIds} />);
    const dialog = component.find(Dialog).getElement();
    expect(dialog.props.open).toBeFalsy();
  });

  it('sets the dialog `open` prop to `true` if `isOpen` flag is set to `true`', () => {
    const component = shallow(<NewLink isOpen={true} saveNewLink={saveNewLink} cancelNewLink={cancelNewLink} nodesIds={nodesIds} />);
    const dialog = component.find(Dialog).getElement();
    expect(dialog.props.open).toBeTruthy();
  });

  it('invokes the `cancel` function when the `cancel` button is clicked', () => {
    const component = shallow(<NewLink isOpen={isOpen} saveNewLink={saveNewLink} cancelNewLink={cancelNewLink} nodesIds={nodesIds} />);
    component
      .find(Formik)
      .dive()
      .find('[type="button"].cancel')
      .first()
      .simulate('click');
    expect(cancelNewLink).toHaveBeenCalled();
  });
});
