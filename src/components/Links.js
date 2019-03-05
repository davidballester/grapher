import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

export default class Links extends React.PureComponent {
  static propTypes = {
    links: PropTypes.arrayOf(PropTypes.any).isRequired,
  };

  componentDidMount() {
    const { links } = this.props;

    const d3Links = d3.select(this.linksRef);

    d3Links
      .selectAll('line')
      .data(links)
      .enter()
      .append('line');
  }

  render() {
    return <g ref={(ref) => (this.linksRef = ref)} stroke="#999" strokeOpacity="0.6" />;
  }
}
