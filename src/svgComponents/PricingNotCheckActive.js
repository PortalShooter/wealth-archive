import * as React from 'react';

const SvgPricingNotCheckActive = (props) => (
  <svg width={40} height={40} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx={20} cy={20} r={20} fill="#fff" />
    <path
      d="m20 20.12 5.5-5.556M14.5 25.674l5.5-5.555M20 20.12l-5.5-5.556M25.5 25.674 20 20.119"
      stroke="#B6BAC3"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default SvgPricingNotCheckActive;
