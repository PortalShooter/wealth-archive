import React from 'react';
import styles from './CTAButton.module.scss';

function CTAButton({ title }) {
  return <button className={styles['btn']}>{title}</button>;
}

export default CTAButton;
