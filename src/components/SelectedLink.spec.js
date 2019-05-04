import React from 'react';
import { mount } from 'enzyme';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import SelectedLink from './SelectedLink';

describe(SelectedLink.name, () => {
  let openConfirmDeleteLink;
  let link;

  beforeEach(() => {
    openConfirmDeleteLink = jest.fn();
    link = {
      id: 'foo',
      label: 'bar',
    };
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders without crashing', () => {
    const component = mount(<SelectedLink link={link} openConfirmDeleteLink={openConfirmDeleteLink} />);
    expect(component).toBeDefined();
  });

  it('displays the link label in a Typography', () => {
    const component = mount(<SelectedLink link={link} openConfirmDeleteLink={openConfirmDeleteLink} />);
    expect(
      component
        .find(Typography)
        .last()
        .text()
    ).toEqual(link.label);
  });

  it('invokes the `openConfirmDeleteLink` prop when the delete button is clicked', () => {
    const component = mount(<SelectedLink link={link} openConfirmDeleteLink={openConfirmDeleteLink} />);
    component.find(Button).simulate('click');
    expect(openConfirmDeleteLink).toHaveBeenCalledWith(link.id);
  });
});
