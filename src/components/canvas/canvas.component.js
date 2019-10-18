import React, { useRef, useEffect, useState } from 'react';
import ForceGraph2D from 'react-force-graph-2d';

import { renderNode, getNodeColor } from './services/node-renderer.service';
import { getLinkColor } from './services/link-renderer.service';

const updateDimensions = (setDimensions, containerRef) => {
  const headerHeight = window.innerWidth < 600 ? 60 : 70;
  setDimensions({
    width: containerRef.current.clientWidth,
    height: window.innerHeight - headerHeight,
  });
};

const getNodeDegree = (node, links) => links.filter((link) => link.source === node.id || link.target === node.id).length;

export default ({
  registerCanvasComponent,
  linksIdsWithOpposite,
  nodes = [],
  selectedNodes = [],
  selectNode,
  deselectNode,
  links = [],
  selectedLink,
  selectLink,
  deselectLink,
  openNewNode,
  className,
}) => {
  const forceGraphRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!!registerCanvasComponent) {
      registerCanvasComponent(forceGraphRef.current);
    }
  }, [registerCanvasComponent]);

  // Manage resizing of the canvas
  const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });
  useEffect(() => {
    updateDimensions(setDimensions, containerRef);
    const resize = () => updateDimensions(setDimensions, containerRef);
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  // Manage zoom
  const [zoom, setZoom] = useState(undefined);
  useEffect(() => {
    if (!!forceGraphRef.current.zoom) {
      const newZoom = forceGraphRef.current.zoom();
      if (!zoom) {
        forceGraphRef.current.zoom(newZoom * 5);
        setZoom(newZoom);
      }
    }
  }, [zoom]);

  // Manage links
  const [linksGraphData, setLinksGraphData] = useState([]);
  useEffect(() => {
    setLinksGraphData((currentLinksGraphData) => {
      let newLinksGraphData = links.map((link) => {
        const linkGraphData = currentLinksGraphData.find(({ id }) => link.id === id);
        return {
          ...linkGraphData,
          ...link,
          original: link,
          selected: link.id === (selectedLink || {}).id,
          artificial: false,
        };
      });

      // Create artificial links (invisible through link-renderer) to avoid orphan nodes from scattering
      const lastNodeWithSomeDegree = nodes.reverse().find((node) => getNodeDegree(node, links) > 0);
      if (!!lastNodeWithSomeDegree) {
        newLinksGraphData = [
          ...newLinksGraphData,
          ...nodes
            .filter((node) => getNodeDegree(node, links) === 0)
            .map((node) => ({
              source: lastNodeWithSomeDegree.id,
              target: node.id,
              artificial: true,
            })),
        ];
      } else if (nodes.length > 0) {
        newLinksGraphData = [
          ...newLinksGraphData,
          ...new Array(nodes.length - 1).fill(undefined).map((value, index) => ({
            source: nodes[index].id,
            target: nodes[index + 1].id,
            artificial: true,
          })),
        ];
      }
      return newLinksGraphData;
    });
  }, [links, nodes, selectedNodes, selectedLink]);

  // Manage nodes
  const [nodesGraphData, setNodesGraphData] = useState([]);
  useEffect(() => {
    setNodesGraphData((currentNodesGraphData) =>
      nodes.map((node) => {
        const nodeGraphData = currentNodesGraphData.find(({ id }) => id === node.id);
        return {
          ...nodeGraphData,
          ...node,
          degree: getNodeDegree(node, links),
          selected: !!selectedNodes.find(({ id }) => id === node.id),
        };
      })
    );
  }, [nodes, links, selectedNodes]);

  return (
    <div className={className} onDoubleClick={openNewNode} tabIndex="0" ref={containerRef}>
      <ForceGraph2D
        ref={forceGraphRef}
        graphData={{
          nodes: nodesGraphData,
          links: linksGraphData,
        }}
        width={dimensions.width}
        height={dimensions.height}
        enableNodeDrag={true}
        nodeCanvasObject={renderNode}
        nodeLabel="id"
        nodeColor={getNodeColor}
        nodeCanvasObjectMode={() => 'before'}
        linkDirectionalArrowLength={5}
        linkDirectionalArrowRelPos={1}
        linkColor={getLinkColor}
        linkWidth={3}
        linkDirectionalParticles={4}
        linkDirectionalParticleWidth={(link) => (link.selected ? 4 : 0)}
        linkLabel="label"
        linkCurvature={({ id }) => (!!linksIdsWithOpposite.find((linkId) => linkId === id) ? 0.3 : 0)}
        onNodeClick={(node) => {
          const isSelected = !!selectedNodes.find((n) => n.id === node.id);
          if (isSelected && !!deselectNode) {
            deselectNode(node.id);
          } else if (!!selectNode) {
            const actualNode = nodes.find((n) => n.id === node.id);
            selectNode(actualNode);
          }
        }}
        onLinkClick={(link) => {
          const originalLink = link.original;
          if (link.selected) {
            deselectLink(originalLink);
          } else {
            selectLink(originalLink);
          }
        }}
      />
    </div>
  );
};
