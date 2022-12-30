import React, {forwardRef} from 'react';

// Styles
import classNames from 'classnames/bind';
import styles from './Section.module.scss';

const cx = classNames.bind(styles);

const normalSection = ({className, children, isPaddingTop = false,id}, ref) => {
  return (
    <section id={id} className={cx(styles.Section, isPaddingTop && styles.Section_PaddingTop, className)} ref={ref}>
      {children}
    </section>
  );
};

export const Section = forwardRef(normalSection);
