import React, {forwardRef} from 'react';

// Styles
import classNames from 'classnames/bind';
import styles from './Container.module.scss';

const cx = classNames.bind(styles);

const cleanContainer = ({className, small = false, children}, ref) => {
  return (
    <div className={cx(styles.Container, small && styles.Container_Small, className)} ref={ref}>
      {children}
    </div>
  );
};

export const Container = forwardRef(cleanContainer);
