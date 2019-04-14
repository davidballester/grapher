import React from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';

import SelectedNode from './SelectedNode';

export const StyledSelectedNode = styled(SelectedNode)`
  margin-bottom: 1rem;
`;

function SelectedNodes({ nodes = [], ...props }) {
  return nodes.map((node) => <StyledSelectedNode key={node.id} node={node} {...props} />);
}

SelectedNodes.propTypes = {
  nodes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
  openConfirmDeleteNode: PropTypes.func.isRequired,
  openEditNode: PropTypes.func.isRequired,
};

export default SelectedNodes;
