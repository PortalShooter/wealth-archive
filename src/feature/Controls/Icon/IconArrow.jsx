import React from 'react';
import cn from 'classnames';
import styles from './iconArrow.module.scss';

export function IconArrow({ className, style, type = 'simple', direction = 'top', color = 'lightGreen' }) {
  const directionClassName =
    direction === 'right'
      ? styles.Icon_directionRight
      : direction === 'bottom'
      ? styles.Icon_directionBottom
      : direction === 'left'
      ? styles.Icon_directionLeft
      : null;

  const colorClassName =
    color === 'lightGreen'
      ? styles.Icon_lightGreen
      : color === 'green'
      ? styles.Icon_green
      : color === 'yellow'
      ? styles.Icon_yellow
      : null;

  return type === 'simple' ? (
    <span
      role="presentation"
      style={style}
      className={cn(className, styles.Simple, directionClassName, colorClassName)}
     />
  ) : (
    <span
      role="presentation"
      style={style}
      className={cn(className, styles.Arrow, directionClassName, colorClassName)}
     />
  );
}
