import React from 'react';
import classnames from "classnames/bind";
import styles from './FlyingIllustartions.module.scss';
const cn = classnames.bind(styles);


function AutoIcon({className,style}) {
  return  <svg className={className} style={style} width="112" height="112" viewBox="0 0 112 112" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g>
      <path d="M101.5 90.9994V50.3883L90.8874 22.7352C89.1566 18.2255 84.8257 15.2487 79.9952 15.2487H56" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10.3145 50.2157L19.0344 23.3175C20.594 18.5069 25.0754 15.2487 30.1325 15.2487H55.434" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M81.8721 83.3009L84.4054 93.6368C84.9171 95.7245 86.7885 97.1926 88.9379 97.1926H96.8332C99.4106 97.1926 101.5 95.1033 101.5 92.5259V71.1666" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M30.1299 83.3009L27.5704 93.6466C27.0551 95.7296 25.186 97.1926 23.0403 97.1926H14.985C12.4077 97.1926 10.3184 95.1033 10.3184 92.526V68.8334" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M30.1279 82.9906H81.6871" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9.77561 50.1666H3.70117" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M108.493 50.1074H102.419" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <path  className={cn('fixed-stroke')} d="M84.0001 68.7273C86.8117 68.7273 89.091 66.448 89.091 63.6364C89.091 60.8248 86.8117 58.5455 84.0001 58.5455C81.1885 58.5455 78.9092 60.8248 78.9092 63.6364C78.9092 66.448 81.1885 68.7273 84.0001 68.7273Z" stroke="currentColor" strokeWidth="3"/>
      <path className={cn('fixed-stroke')} d="M25.4542 68.7273C28.2658 68.7273 30.5451 66.448 30.5451 63.6364C30.5451 60.8248 28.2658 58.5455 25.4542 58.5455C22.6426 58.5455 20.3633 60.8248 20.3633 63.6364C20.3633 66.448 22.6426 68.7273 25.4542 68.7273Z" stroke="currentColor" strokeWidth="3"/>
    </g>
  </svg>

}

export default AutoIcon

