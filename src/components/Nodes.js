import React from 'react';
import PropTypes from 'prop-types';
import red from '@material-ui/core/colors/red';
import * as d3 from 'd3';

export default class Nodes extends React.PureComponent {
  static propTypes = {
    nodes: PropTypes.arrayOf(PropTypes.any).isRequired,
    simulation: PropTypes.any.isRequired,
    drag: PropTypes.func,
  };

  componentDidMount() {
    const { nodes, simulation, drag } = this.props;

    const d3Nodes = d3.select(this.nodesRef);

    const nodesElements = d3Nodes.data(nodes).enter();

    const circles = nodesElements
      .append('circle')
      .attr('r', 20)
      .attr('fill', red['A200']);

    if (!!drag) {
      circles.call(drag(simulation));
    }

    const texts = nodesElements
      .append('text')
      .text((node) => node.id)
      .attr('stroke', '#000')
      .style('text-anchor', 'middle')
      .style('font-size', '14px');

    if (!!drag) {
      texts.call(drag(simulation));
    }
  }

  render() {
    return <g ref={(ref) => (this.nodesRef = ref)} stroke="#fff" strokeWidth="1.5" />;
  }
}
