import * as React from 'react';

const SvgPricing = (props) => (
  <svg width={32} height={32} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx={21.908} cy={9.453} r={7.037} stroke="#00857C" strokeWidth={2} />
    <circle cx={7.82} cy={18.002} r={5.673} stroke="#00857C" strokeWidth={2} />
    <circle cx={21.425} cy={25.306} r={4.31} stroke="#00857C" strokeWidth={2} />
    <path d="M19.38 8.452a1 1 0 1 0 0 2v-2Zm5.055 2a1 1 0 0 0 0-2v2Zm-5.054 0h5.054v-2h-5.054v2Z" fill="#00857C" />
    <path d="M22.908 6.925a1 1 0 1 0-2 0h2Zm-2 5.055a1 1 0 1 0 2 0h-2Zm0-5.055v5.055h2V6.925h-2Z" fill="#00857C" />
  </svg>
);

export default SvgPricing;
