import * as React from 'react';

const SvgPricingNotActiveCheck = (props) => (
  <svg width={40} height={40} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx={20} cy={20} r={20} fill="#DCF4F2" />
    <path
      d="m14 20.25 4.25 4.25L25.9 16"
      stroke="#00534F"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default SvgPricingNotActiveCheck;
