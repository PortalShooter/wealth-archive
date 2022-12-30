import React, {useEffect, useState} from 'react';

// Components
import BackArrow from '@/svgComponents/BackArrow';

// Styles
import classnames from 'classnames/bind';
import styles from './BtnBack.module.scss';
import {syncResize} from "@/shared/resize";

const cn = classnames.bind(styles);

function BtnBack() {
  const [isWindowWide, setIsWindowWide] = useState(false);

  const handleResize = () => {
    const isWide = syncResize.get().width > 980
    setIsWindowWide(isWide);
  }

  useEffect(() => {
    handleResize();
    syncResize.subscribe(handleResize);

    return () => syncResize.unsubscribe(handleResize)
  }, []);

  return (
    <div className={cn('btn', {left: isWindowWide})}>
      <div className={cn('btn__icon')}>
        <BackArrow/>
      </div>
      <span className={cn('btn__text')}>Back</span>
    </div>
  );
}

export default BtnBack;
