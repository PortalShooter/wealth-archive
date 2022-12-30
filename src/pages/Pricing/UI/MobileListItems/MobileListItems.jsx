import React from 'react';
import styles from './MobileListItems.module.scss';

import classnames from "classnames/bind";
const cn = classnames.bind(styles);

function MobileListItems({title, description}) {

  return (
    <div className={cn("content")}>
      <div className={cn("content__title")}>{title}</div>
      <div className={cn("content__description")}>{description}</div>
    </div>
  )
}

export default MobileListItems;
