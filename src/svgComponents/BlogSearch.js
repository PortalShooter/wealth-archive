import * as React from 'react';

const SvgBlogSearch = (props) => (
  <svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx={10.5} cy={10.5} r={6.5} stroke="#00534F" strokeWidth={2} />
    <path
      d="M18.293 19.707a1 1 0 0 0 1.414-1.414l-1.414 1.414Zm-2.086-4.914a1 1 0 0 0-1.414 1.414l1.414-1.414Zm3.5 3.5-3.5-3.5-1.414 1.414 3.5 3.5 1.414-1.414Z"
      fill="#00534F"
    />
  </svg>
);

export default SvgBlogSearch;
