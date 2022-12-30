import React, { useRef, useState } from 'react';

import classnames from 'classnames/bind';
import styles from './TableRow.module.scss';
import ListContent from '../ListContent';
import { useScrollInView } from '@/hooks';
const cn = classnames.bind(styles);

function TableRow({ data, index }) {
  const compare = useRef();
  return (
    <div className={cn(useScrollInView(compare).spawnAnimation, 'container')} ref={compare}>
      <ListContent data={data} index={index} />
    </div>
  );
}

export default TableRow;
