import * as React from 'react';

const SvgSolutionsOldWay = (props) => (
  <svg width={40} height={40} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx={20} cy={20} r={20} fill="#fff" />
    <path
      d="m20 20 5.5-5.5M14.5 25.5 20 20M20 20l-5.5-5.5M25.5 25.5 20 20"
      stroke="#B6BAC3"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default SvgSolutionsOldWay;
