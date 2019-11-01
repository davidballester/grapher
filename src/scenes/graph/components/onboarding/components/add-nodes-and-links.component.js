import React from 'react';
import Box from '@material-ui/core/Box';

const AddNodesAndLinks = ({ hidden, className }) => (
  <Box hidden={hidden} className={className}>
    <p>Nodes have names and are surrounded by parentheses. Check out these exmaples:</p>
    <pre>
      (Aragorn)
      <br />
      (Galadriel)
      <br />
      (Bilbo Baggins)
      <br />
    </pre>
    <p>A link joins two nodes in a specific direction. They can be labelled too.</p>
    <pre>
      (Aragorn)->(Bilbo Baggins)
      <br />
      (Elrond)-[:hosts]->(Bilbo Baggings)
      <br />
      (Galadriel)&lt;-(Gimli)
      <br />
    </pre>
    <p>You can write down more elaborated paths between your nodes and add as many details as you want!</p>
    <pre>(Aragorn)-[:guides]->(Frodo)&lt;-[:uncle]-(Bilbo)&lt;-[:lives in]-(Rivendel)&lt;-(Elrond)-[:father]->(Arwen)</pre>
    <p>There is no need to declare your nodes before using them.</p>
  </Box>
);

export default AddNodesAndLinks;
