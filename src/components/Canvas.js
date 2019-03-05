import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

import Nodes from './Nodes';
import Links from './Links';
import linksService from '../services/links-service';

export default class Canvas extends React.PureComponent {
  static propTypes = {
    nodes: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
      })
    ),
    links: PropTypes.arrayOf(
      PropTypes.shape({
        source: PropTypes.string.isRequired,
        target: PropTypes.string.isRequired,
      })
    ),
    className: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.initialize();
  }

  initialize = () => {
    const { nodes, links } = this.props;
    this.d3Svg = d3.select(this.canvasRef);

    this.width = window.innerWidth;
    this.height = window.innerHeight;

    const bodyCharge = d3.forceManyBody().distanceMax(Math.min(this.width, this.height) * 0.33);
    const linkForce = d3.forceLink(links).id(linksService.getId);

    this.simulation = d3
      .forceSimulation(nodes)
      .force('link', linkForce)
      .force('charge', bodyCharge)
      .force('center', d3.forceCenter(this.width / 2, this.height / 2));

    this.drag = () =>
      d3
        .drag()
        .on('start', (d) => {
          if (!d3.event.active) {
            this.simulation.alphaTarget(0.3).restart();
          }
          d.fx = d.x;
          d.fy = d.y;
        })
        .on('drag', (d) => {
          d.fx = d3.event.x;
          d.fy = d3.event.y;
        })
        .on('end', (d) => {
          if (!d3.event.active) {
            this.simulation.alphaTarget(0);
          }
          d.fx = null;
          d.fy = null;
        });
  };

  componentDidMount() {
    this.simulation.on('tick', () => {
      // d3Svg
      //   .selectAll('line')
      //   .attr('x1', (link) => link.source.x)
      //   .attr('y1', (link) => link.source.y)
      //   .attr('x2', (link) => link.target.x)
      //   .attr('y2', (link) => link.target.y);
      // d3Svg
      //   .selectAll('circle')
      //   .attr('cx', (node) => Math.min(Math.max(0, node.x), width))
      //   .attr('cy', (node) => Math.min(Math.max(0, node.y), height));
      // d3Svg
      //   .selectAll('text')
      //   .attr('x', (node) => node.x)
      //   .attr('y', (node) => node.y + 5);
    });
  }

  render() {
    const { className, nodes = [], links = [] } = this.props;
    return (
      <svg ref={(ref) => (this.canvasRef = ref)} className={className} width={this.width} height={this.height}>
        <Nodes drag={this.drag} simulation={this.simulation} nodes={nodes} />
        <Links links={links} />
      </svg>
    );
  }
}
