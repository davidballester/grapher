import React from 'react';
import { mount } from 'enzyme';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import SelectedLink from './SelectedLink';

describe(SelectedLink.name, () => {
  let openConfirmDeleteLink;
  let openEditLink;
  let link;

  beforeEach(() => {
    openConfirmDeleteLink = jest.fn();
    openEditLink = jest.fn();
    link = {
      id: 'foo',
      label: 'bar',
    };
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders without crashing', () => {
    const component = mount(<SelectedLink link={link} openConfirmDeleteLink={openConfirmDeleteLink} openEditLink={openEditLink} />);
    expect(component).toBeDefined();
  });

  it('displays the link label in a Typography', () => {
    const component = mount(<SelectedLink link={link} openConfirmDeleteLink={openConfirmDeleteLink} openEditLink={openEditLink} />);
    expect(
      component
        .find(Typography)
        .last()
        .text()
    ).toEqual(link.label);
  });

  it('invokes the `openConfirmDeleteLink` prop when the delete button is clicked', () => {
    const component = mount(<SelectedLink link={link} openConfirmDeleteLink={openConfirmDeleteLink} openEditLink={openEditLink} />);
    component.find('Button.delete').simulate('click');
    expect(openConfirmDeleteLink).toHaveBeenCalledWith(link.id);
  });

  it('invokes the `openEditLink` prop when the delete button is clicked', () => {
    const component = mount(<SelectedLink link={link} openConfirmDeleteLink={openConfirmDeleteLink} openEditLink={openEditLink} />);
    component.find('Button.edit').simulate('click');
    expect(openEditLink).toHaveBeenCalledWith(link);
  });
});
