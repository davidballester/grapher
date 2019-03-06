import React from 'react';
import PropTypes from 'prop-types';
import ForceGraph2D from 'react-force-graph-2d';

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

  render() {
    const { className, nodes = [], links = [] } = this.props;
    return (
      <div className={className}>
        <ForceGraph2D
          graphData={{ nodes, links }}
          nodeLabel="id"
          linkDirectionalArrowLength={5}
          linkDirectionalArrowRelPos={1}
          enableNodeDrag={true}
        />
      </div>
    );
  }
}
