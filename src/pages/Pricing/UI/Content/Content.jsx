import React from 'react';
import styles from './Content.module.scss';
import classnames from 'classnames/bind';
const cn = classnames.bind(styles);

function Content({ data }) {
  return (
    <div className={cn('content')}>
      <div className={cn('content__title')}>{data?.title}</div>
      <div className={cn('content__description')}>{data?.description}</div>
    </div>
  );
}

export default Content;
