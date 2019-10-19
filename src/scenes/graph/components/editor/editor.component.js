import React from 'react';
import AceEditor from 'react-ace';

import 'brace/mode/text';
import 'brace/theme/monokai';

function Editor({ text, textError, setText, ...props }) {
  let annotations = undefined;
  if (!!textError) {
    const message = textError.shortMessage;
    const position = message
      .substring(0, message.indexOf(':'))
      .split(',')
      .map((pos) => pos.replace('Line', ''))
      .map((pos) => pos.replace('col', ''))
      .map((pos) => pos.trim());
    const messageText = message.substring(message.indexOf(':') + 1).trim();
    annotations = [
      {
        row: parseInt(position[0]) - 1,
        col: parseInt(position[1]),
        type: 'error',
        text: messageText,
      },
    ];
  }
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
      annotations={annotations}
      {...props}
    />
  );
}

export default Editor;
