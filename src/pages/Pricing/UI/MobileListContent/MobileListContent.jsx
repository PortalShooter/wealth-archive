import React from 'react';
import styles from './MobileListContent.module.scss';
import { PricingOpenArrow } from 'src/svgComponents';

import classnames from 'classnames/bind';
import MobileListItems from '../MobileListItems';
const cn = classnames.bind(styles);

function MobileListContent({ list, setIsOpen, title }) {
  const items = list?.map((elem) => (
    <MobileListItems key={elem._key} title={elem.title} description={elem.description} />
  ));

  const handleCloseClick = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <div className={cn('content')} onClick={handleCloseClick}>
        <div className={cn('content__title')}>{title}</div>
        <div className={cn('content__icon')}>
          <PricingOpenArrow />
        </div>
      </div>
      <div className={cn('items')}>{items}</div>
    </div>
  );
}

export default MobileListContent;
