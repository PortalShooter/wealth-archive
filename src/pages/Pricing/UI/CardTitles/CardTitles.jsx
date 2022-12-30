import React, { useEffect, useRef, useState } from 'react';

// Styles
import styles from './CardTitles.module.scss';
import classnames from 'classnames/bind';
const cn = classnames.bind(styles);

// Hooks
import { useWindowSize } from '@/hooks';

// Components
import { PricingCloseArrow } from 'src/svgComponents';
import MobileListItems from '@/pages/Pricing/UI/MobileListItems';

function CardTitles({ title, list }) {
  const [isOpen, setIsOpen] = useState(false);
  const listElementRef = useRef();
  const [height, setHeight] = useState(0);
  const { windowWidth } = useWindowSize();

  const closeElem = () => {
    setIsOpen(!isOpen);
  };

  const items = list?.map((elem) => (
    <MobileListItems key={elem._key} title={elem.title} description={elem.description} />
  ));
  useEffect(() => {
    const timeout = setTimeout(() => {
      const elHeight = listElementRef.current?.scrollHeight;

      if (windowWidth >= 1440) {
        setHeight(elHeight);
      } else if (windowWidth >= 768) {
        setHeight(elHeight);
      } else {
        setHeight(elHeight);
      }
    }, 333);

    return () => clearTimeout(timeout);
  }, [listElementRef.current, windowWidth, list]);

  return (
    <div className={cn('border')}>
      <div className={cn('content')} onClick={closeElem}>
        <div className={cn('content__title')}>{title}</div>
        <div className={cn('content__icon', { content__icon_open: isOpen }, { content__icon_close: !isOpen })}>
          {/*{!isOpen ? */}
          <PricingCloseArrow />
          {/*: <PricingOpenArrow />}*/}
        </div>
      </div>
      <div className={cn('animation')} ref={listElementRef} style={{ height: `${isOpen ? height : 0}px` }}>
        {items}
      </div>
    </div>
  );
}

export default CardTitles;
