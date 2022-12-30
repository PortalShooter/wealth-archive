import React, { useState } from 'react';
import styles from './Checks.module.scss';

import classnames from 'classnames/bind';
const cn = classnames.bind(styles);

import { PricingNotActiveCheck, PricingNotCheck } from 'src/svgComponents';

function Checks({ data }) {
  const flags = [data?.isCore, data?.isWill, data?.isTrust];
  const icons = flags.map((flag, i) => (
    <div key={i} className={styles['icons__svg']}>
      {flag ? <PricingNotActiveCheck /> : <PricingNotCheck />}
    </div>
  ));

  return <div className={cn('icons')}>{icons}</div>;
}

export default Checks;
