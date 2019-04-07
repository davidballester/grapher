import React from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';

import SelectedNode from './SelectedNode';

export const StyledSelectedNode = styled(SelectedNode)`
  margin-bottom: 1rem;
`;

export const SelectedNodesContainer = styled.div`
  position: absolute;
  right: 1rem;
  bottom: 0;
`;

function SelectedNodes({ nodes = [], openConfirmDeleteNode }) {
  const selectedNodes = nodes.map((node) => <StyledSelectedNode key={node.id} node={node} openConfirmDeleteNode={openConfirmDeleteNode} />);
  return <SelectedNodesContainer>{selectedNodes}</SelectedNodesContainer>;
}

SelectedNodes.propTypes = {
  nodes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
  openConfirmDeleteNode: PropTypes.func.isRequired,
};

export default SelectedNodes;
