import React, { useRef, useState } from 'react';
import styles from './Switch.module.scss';
import classnames from 'classnames/bind';
const cn = classnames.bind(styles);

function Switch({ btnFirst, btnSecond, setIsCouple, flag }) {
  const background = useRef(null);
  let [opacity, setOpacity] = useState(false);

  const handleCoupleClick = () => {
    setOpacity(true);
    setIsCouple(false);
    setTimeout(() => setOpacity(false), 300);
  };
  const handleCoupleClickFalse = () => {
    setOpacity(true);
    setIsCouple(true);
    setTimeout(() => setOpacity(false), 300);
  };

  return (
    <div className={styles['links']}>
      <div
        className={cn('links__switch', { links__switch__move: flag }, { links__switch__opacity: opacity })}
        ref={background}
      ></div>
      <button
        className={cn('link', 'links__item', { links__item__checked: !flag }, { 'links__item__not-checked': flag })}
        onClick={handleCoupleClick}
      >
        {btnFirst}
      </button>
      <button
        className={cn('link', 'links__item', { links__item__checked: flag }, { 'links__item__not-checked': !flag })}
        onClick={handleCoupleClickFalse}
      >
        {btnSecond}
      </button>
    </div>
  );
}

export default Switch;
