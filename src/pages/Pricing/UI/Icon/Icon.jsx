import React from 'react';
import styles from './Icon.module.scss';

import classnames from "classnames/bind";
const cn = classnames.bind(styles);

function Icon({title}) {

  return (
    <div className={cn("label")}>
      {title}
    </div>
  )
}

export default Icon;
