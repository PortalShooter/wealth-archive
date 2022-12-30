import React from 'react';

function SvgPreviewComponent({ value }) {
  if (!value) {
    return <pre>Please upload an svg image</pre>;
  }
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: value.svgHtml }} />
    </>
  );
}

export default SvgPreviewComponent;
