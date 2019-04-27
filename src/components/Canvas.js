import React from 'react';
import PropTypes from 'prop-types';
import ForceGraph2D from 'react-force-graph-2d';
import blue from '@material-ui/core/colors/blue';
import orange from '@material-ui/core/colors/orange';
import grey from '@material-ui/core/colors/grey';

const nodeProp = PropTypes.shape({
  id: PropTypes.string.isRequired,
});

const linkProp = PropTypes.shape({
  id: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired,
  target: PropTypes.string.isRequired,
});

export default class Canvas extends React.Component {
  static propTypes = {
    nodes: PropTypes.arrayOf(nodeProp),
    links: PropTypes.arrayOf(linkProp),
    className: PropTypes.string,
    openNewNode: PropTypes.func,
    selectNode: PropTypes.func,
    selectedNodes: PropTypes.arrayOf(PropTypes.any),
    createLink: PropTypes.func,
    virtualLink: PropTypes.any,
    openConfirmDeleteNode: PropTypes.func,
    selectedLink: linkProp,
    selectLink: PropTypes.func,
    deselectLink: PropTypes.func,
    openConfirmDeleteLink: PropTypes.func,
    openEditNode: PropTypes.func,
  };

  state = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  constructor(props) {
    super(props);
    this.canvas = undefined;
    this.graphNodesData = [];
    this.graphLinksData = [];
    this.originalZoom = undefined;
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener('resize', this.updateDimensions.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions.bind(this));
  }

  render() {
    const { className, openNewNode, nodes, links, selectedNodes, virtualLink, selectedLink } = this.props;
    const { height, width } = this.state;
    this.synchronizeGraphData(nodes, links, selectedNodes, virtualLink, selectedLink);
    if (!!this.canvas) {
      this.setZoom();
    }

    return (
      <div className={className} onDoubleClick={openNewNode} tabIndex="0" onKeyUp={(evt) => this.handleKey(evt.key)}>
        <ForceGraph2D
          ref={(canvas) => (this.canvas = canvas)}
          height={height}
          width={width}
          graphData={{ nodes: this.graphNodesData, links: this.graphLinksData }}
          nodeRelSize={8}
          linkDirectionalArrowLength={5}
          linkDirectionalArrowRelPos={1}
          enableNodeDrag={true}
          nodeCanvasObject={(node, ctx, globalScale) => this.renderNode(node, ctx, globalScale)}
          linkCanvasObject={(link, ctx, globalScale) => this.renderLink(link, ctx, globalScale)}
          onNodeClick={(node) => this.toggleNodeSelection(node)}
          onLinkClick={(link) => this.linkClick(link)}
        />
      </div>
    );
  }

  handleKey = (key) => {
    switch (key) {
      case 'Backspace':
      case 'Delete':
        this.onDeleteKey();
        break;
      case 'Enter':
        this.onEnterKey();
        break;
      default:
        break;
    }
  };

  onDeleteKey = () => {
    const selectedNodes = this.props.selectedNodes || [];
    const selectedLink = this.props.selectedLink;
    if (!!selectedNodes.length && !selectedLink) {
      this.props.openConfirmDeleteNode(selectedNodes.map((node) => node.id));
    } else if (!selectedNodes.length && !!selectedLink) {
      this.props.openConfirmDeleteLink(selectedLink.id);
    }
  };

  onEnterKey = () => {
    const selectedNodes = this.props.selectedNodes || [];
    if (selectedNodes.length === 1) {
      this.props.openEditNode(selectedNodes[0]);
    }
  };

  synchronizeGraphData = (nodes, links, selectedNodes, virtualLink, selectedLink) => {
    this.synchronizeNodes(nodes);
    this.synchronizeLinks(links);
    if (!!virtualLink) {
      this.addVirtualLink(virtualLink);
    }
    this.markAllNodesAsDeselected();
    this.markNodesAsSelected(selectedNodes);
    this.markLinkAsSelected(selectedLink);
  };

  synchronizeNodes = (nodes = []) => {
    const preservedNodes = this.graphNodesData.filter((graphNode) => !!nodes.find((n) => n.id === graphNode.id));
    const newNodes = nodes.filter((node) => !this.graphNodesData.find((graphNode) => graphNode.id === node.id)).map(({ id }) => ({ id }));
    this.graphNodesData = [...preservedNodes, ...newNodes];
  };

  synchronizeLinks = (links = []) => {
    this.graphLinksData = links.map((link) => this.toGraphLink(link));
  };

  markNodesAsSelected = (selectedNodes = []) => {
    selectedNodes.forEach((selectedNode) => {
      const node = this.graphNodesData.find((n) => n.id === selectedNode.id);
      node.selected = true;
    });
  };

  markLinkAsSelected = (link) => {
    if (!!link) {
      const graphLink = this.graphLinksData.find((l) => l.id === link.id);
      graphLink.selected = true;
    }
  };

  markAllNodesAsDeselected = () => {
    this.graphNodesData = this.graphNodesData.map((node) => ({ ...node, selected: false }));
  };

  setZoom = () => {
    if (!this.originalZoom) {
      this.originalZoom = this.canvas.zoom();
    }
    if (this.graphNodesData.length === 1) {
      this.canvas.zoom(this.originalZoom * 5);
    }
  };

  toggleNodeSelection = (node) => {
    const { selectedNodes = [], selectNode, deselectNode, nodes } = this.props;
    const isSelected = !!selectedNodes.find((n) => n.id === node.id);
    if (isSelected) {
      deselectNode(node.id);
    } else {
      const actualNode = nodes.find((n) => n.id === node.id);
      selectNode(actualNode);
    }
  };

  toGraphLink = (link) => {
    return {
      ...link,
    };
  };

  fromGraphLink = (link) => {
    return {
      id: link.id,
      source: link.source.id,
      target: link.target.id,
    };
  };

  addVirtualLink = (virtualLink) => {
    this.graphLinksData = [
      ...this.graphLinksData,
      {
        ...this.toGraphLink(virtualLink),
        virtual: true,
      },
    ];
  };

  linkClick = (link) => {
    const stateLink = this.fromGraphLink(link);
    if (link.virtual) {
      this.props.createLink(stateLink);
    } else if (link.selected) {
      this.props.deselectLink(stateLink);
    } else {
      this.props.selectLink(stateLink);
    }
  };

  renderNode = (node, ctx, globalScale) => {
    this.renderCircle(node, ctx);
    this.renderLabel(node, ctx, globalScale);
  };

  renderLink = (link, ctx, globalScale) => {
    const { source, target, virtual = false, selected = false } = link;
    let strokeStyle;
    if (virtual) {
      strokeStyle = blue['A200'];
    } else if (selected) {
      strokeStyle = orange['A700'];
    } else {
      strokeStyle = grey['300'];
    }
    ctx.strokeStyle = strokeStyle;
    ctx.strokeWidth = 2;
    ctx.beginPath();
    ctx.moveTo(source.x, source.y);
    ctx.lineTo(target.x, target.y);
    ctx.stroke();
  };

  renderCircle = (node, ctx) => {
    const color = node.selected ? orange['A200'] : blue['A200'];
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(node.x, node.y, 8, 0, 2 * Math.PI);
    ctx.fill();
  };

  renderLabel = (node, ctx, globalScale) => {
    const label = node.id;
    const fontSize = 16 / globalScale;

    const textWidth = ctx.measureText(label).width;
    const bckgDimensions = [textWidth + fontSize * 0.2, fontSize * 1.2];
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y + 14 - bckgDimensions[1] / 2, ...bckgDimensions);

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#000';
    ctx.font = `${fontSize}px Sans-Serif`;
    ctx.fillText(node.id, node.x, node.y + 12);
  };

  updateDimensions = () => {
    const headerHeight = window.innerWidth < 600 ? 60 : 70;
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight - headerHeight,
    });
  };
}
