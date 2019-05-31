import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import GetAppIcon from '@material-ui/icons/GetApp';

function download(fileName, content) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
  element.setAttribute('download', fileName);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

function DownloadButton({ fileName, content }) {
  return (
    <Button onClick={() => download(fileName, content)}>
      Download
      <GetAppIcon />
    </Button>
  );
}

DownloadButton.propTypes = {
  fileName: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default DownloadButton;
