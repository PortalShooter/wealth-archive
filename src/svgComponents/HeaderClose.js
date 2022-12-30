import * as React from 'react';

const SvgHeaderClose = (props) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="m12 12 5.5-5.5m-11 11L12 12m0 0L6.5 6.5m11 11L12 12"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default SvgHeaderClose;
