import React, { useState } from 'react';

// Styles
import classnames from 'classnames/bind';
import styles from './ListElement.module.scss';
const cn = classnames.bind(styles);

function ListElement({ data }) {
  return <li className={cn('item')}>{data}</li>;
}

export default ListElement;
