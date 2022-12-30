import * as React from 'react';

const SvgPricingNotCheck = (props) => (
  <svg width={40} height={40} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx={20} cy={20} r={20} fill="#F4F5F8" />
    <path
      d="m20 20.119 5.5-5.554M14.5 25.674l5.5-5.555M20 20.119l-5.5-5.554M25.5 25.674 20 20.119"
      stroke="#B6BAC3"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default SvgPricingNotCheck;
