import React from 'react';
import AceEditor from 'react-ace';

import 'brace/mode/text';
import 'brace/theme/monokai';

function Editor({ text, setText, ...props }) {
  return (
    <AceEditor
      placeholder=""
      theme="monokai"
      mode="text"
      fontSize={12}
      showPrintMargin={false}
      showGutter={true}
      highlightActiveLine={true}
      value={text}
      onChange={setText}
      focus={true}
      setOptions={{
        showLineNumbers: true,
        tabSize: 2,
      }}
      {...props}
    />
  );
}

export default Editor;
