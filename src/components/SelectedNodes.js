import React from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';

import SelectedNode from './SelectedNode';

export const StyledSelectedNode = styled(SelectedNode)`
  margin-bottom: 1rem;
`;

function SelectedNodes({ nodes = [], openConfirmDeleteNode }) {
  return nodes.map((node) => <StyledSelectedNode key={node.id} node={node} openConfirmDeleteNode={openConfirmDeleteNode} />);
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
