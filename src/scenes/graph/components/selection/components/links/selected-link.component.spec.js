import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Markdown from 'react-markdown';

import SelectedLink from './selected-link.component';

describe(SelectedLink.name, () => {
  let shallow;
  let link;

  beforeEach(() => {
    shallow = createShallow({ dive: true });
    link = {
      id: 'foo',
      label: 'bar',
    };
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders without crashing', () => {
    const component = shallow(<SelectedLink link={link} />);
    expect(component).toBeDefined();
  });

  it('displays the link label in a Typography', () => {
    const component = shallow(<SelectedLink link={link} />);
    expect(
      component
        .find(Typography)
        .last()
        .text()
    ).toEqual(link.label);
  });

  it('uses the description of the node as input for a Markdown element', () => {
    link.description = 'lorem ipsum';
    const component = shallow(<SelectedLink link={link} />);
    const markdown = component
      .find(Card)
      .dive()
      .find(Markdown)
      .first()
      .getElement();
    expect(markdown.props.source).toEqual('lorem ipsum');
  });
});
