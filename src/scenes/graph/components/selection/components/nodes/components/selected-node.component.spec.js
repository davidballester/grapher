import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Markdown from 'react-markdown';

import SelectedNode from './selected-node.component';

describe(SelectedNode.name, () => {
  let shallow;
  let node;

  beforeEach(() => {
    shallow = createShallow({ dive: true });
    node = {
      id: 'foo',
    };
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders without crashing', () => {
    const component = shallow(<SelectedNode node={node} />);
    expect(component).toBeDefined();
  });

  it('displays the node ID in a Typography', () => {
    const component = shallow(<SelectedNode node={node} />);
    expect(
      component
        .find(Typography)
        .last()
        .text()
    ).toEqual(node.id);
  });

  it('uses the description of the node as input for a Markdown element', () => {
    node.description = 'lorem ipsum';
    const component = shallow(<SelectedNode node={node} />);
    const markdown = component
      .find(Card)
      .dive()
      .find(Markdown)
      .first()
      .getElement();
    expect(markdown.props.source).toEqual('lorem ipsum');
  });
});
