import React, { useEffect, useRef, useState } from 'react';

// Styles
import styles from './HelpCategoryListItem.module.scss';
import classnames from 'classnames/bind';
const cn = classnames.bind(styles);

// Components
import { HelpArrow } from '@/svgComponents';
import { TextBlock } from '@/feature/TextBlock';
import { getUrlParameter } from '@/helpers';
import {useScrollInView} from "@/hooks";

function HelpCategoryListItem({ data, allData, index, accentPhrase = ''}) {
  const [isClicked, setIsClicked] = useState(false);
  const textRef = useRef(null);
  const itemRef = useRef(null);

  const ocClickItem = () => {
    setIsClicked(!isClicked);
  };

  // useEffect(() => {
  //   if (isClicked) {
  //     return;
  //   }
  //
  //   if (index === data._key) {
  //     setIsClicked(true);
  //   }
  // }, [index]);

  useEffect(() => (async () => {
    const searchParameter = getUrlParameter('q');
    if (data._key === searchParameter || data._key === index) {
      setIsClicked(true);
    }
    })(), [data._key, allData])

  return (
    <div className={cn('item', { item_open: isClicked }, useScrollInView(itemRef).spawnAnimation)} ref={itemRef} onClick={ocClickItem} id={data._key}>
      <div className={cn('item__container')}>
        <TextBlock
          headingText={data?.question ?? data}
          headingStyles={'h5'}
          tagName="h2"
          accentPhrase={accentPhrase}
          headingClassName={cn('item__title')}
          className={cn('item__title-container')}
        />
        <div className={cn('item__icon', { item__icon_open: isClicked }, { item__icon_close: !isClicked })}>
          <HelpArrow />
        </div>
      </div>
      <div
        className={cn('item__content', isClicked ? 'visible' : '')}
        style={{ '--text-height': `${isClicked ? textRef.current.scrollHeight : 0}px` }}
        ref={textRef}
      >
        {data?.answer}
      </div>
      <hr className={cn({ item__line: !isClicked })} />
    </div>
  );
}

export default HelpCategoryListItem;
