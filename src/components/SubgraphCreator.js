import React, { useState } from 'react';
import styled from 'styled-components';
import AceEditor from 'react-ace';
import Button from '@material-ui/core/Button';

import 'brace/mode/text';
import 'brace/theme/monokai';

import Canvas from './Canvas';

const Row = styled.div`
  display: flex;
`;

const Column = styled.div`
  flex: 1;
  max-width: 50vw;
`;

const StyledButton = styled(Button)`
  width: 100%;
`;

function SubgraphCreator({ nodes = [], links = [], processSubgraph, close, importSubgraph, graphId, loadedGraphId, loadGraph }) {
  if (!!graphId && graphId !== loadedGraphId) {
    loadGraph(graphId);
  }

  const [subgraphString, setSubgraphString] = useState('');

  return (
    <Row>
      <Column>
        <AceEditor
          mode="text"
          theme="monokai"
          fontSize={12}
          showPrintMargin={false}
          showGutter={true}
          highlightActiveLine={true}
          value={subgraphString}
          width="100%"
          height="80vh"
          onChange={(value) => {
            setSubgraphString(value);
            processSubgraph(value);
          }}
        />
        <Row style={{ marginTop: '1rem' }}>
          <Column style={{ marginRight: '1rem' }}>
            <StyledButton variant="contained" color="primary" disabled={!nodes.length} onClick={importSubgraph}>
              Save
            </StyledButton>
          </Column>
          <Column>
            <StyledButton onClick={close}>Cancel</StyledButton>
          </Column>
        </Row>
      </Column>
      <Column>
        <Canvas nodes={nodes} links={links} />
      </Column>
    </Row>
  );
}

export default SubgraphCreator;
