import React from 'react';

import classnames from 'classnames/bind';
import styles from './SubscribeBanner.module.scss';
const cn = classnames.bind(styles);

function SubscribeBanner({ content, click }) {
  return <div className={cn('banner', { animation: click })}>{'Thanks for subscribing'}</div>;
}

export default SubscribeBanner;
