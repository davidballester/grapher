import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Markdown from 'react-markdown';

import SelectedLink from './selected-link.component';

describe(SelectedLink.name, () => {
  let shallow;
  let openConfirmDeleteLink;
  let openEditLink;
  let link;

  beforeEach(() => {
    shallow = createShallow({ dive: true });
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
    const component = shallow(<SelectedLink link={link} openConfirmDeleteLink={openConfirmDeleteLink} openEditLink={openEditLink} />);
    expect(component).toBeDefined();
  });

  it('displays the link label in a Typography', () => {
    const component = shallow(<SelectedLink link={link} openConfirmDeleteLink={openConfirmDeleteLink} openEditLink={openEditLink} />);
    expect(
      component
        .find(Typography)
        .last()
        .text()
    ).toEqual(link.label);
  });

  it('invokes the `openConfirmDeleteLink` prop when the delete button is clicked', () => {
    const component = shallow(<SelectedLink link={link} openConfirmDeleteLink={openConfirmDeleteLink} openEditLink={openEditLink} />);
    component
      .find(Card)
      .dive()
      .find('.delete')
      .first()
      .simulate('click');
    expect(openConfirmDeleteLink).toHaveBeenCalledWith(link.id);
  });

  it('invokes the `openEditLink` prop when the delete button is clicked', () => {
    const component = shallow(<SelectedLink link={link} openConfirmDeleteLink={openConfirmDeleteLink} openEditLink={openEditLink} />);
    component
      .find(Card)
      .dive()
      .find('.edit')
      .first()
      .simulate('click');
    expect(openEditLink).toHaveBeenCalledWith(link);
  });

  it('uses the description of the node as input for a Markdown element', () => {
    link.description = 'lorem ipsum';
    const component = shallow(<SelectedLink link={link} openConfirmDeleteLink={openConfirmDeleteLink} openEditLink={openEditLink} />);
    const markdown = component
      .find(Card)
      .dive()
      .find(Markdown)
      .first()
      .getElement();
    expect(markdown.props.source).toEqual('lorem ipsum');
  });
});
