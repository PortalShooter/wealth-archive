import {
  PricingActiveCheck,
  PricingCloseArrow,
  PricingGuardianship,
  PricingHealthCare,
  PricingLastWill,
  PricingNotActiveCheck,
  PricingNotCheck,
  PricingNotCheckActive,
  PricingOpenArrow,
  PricingPower,
  PricingStockOptions,
  PricingWill,
} from 'src/svgComponents';
import Content from '../Content';
import React, { useState, useRef, useEffect } from 'react';
import { useWindowSize } from '@/hooks';

import classnames from 'classnames/bind';
import styles from './ListContent.module.scss';
const cn = classnames.bind(styles);

function ListContent({ data, index }) {
  const [isOpen, setIsOpen] = useState(false);
  const [height, setHeight] = useState(0);
  const elRef = useRef();
  const { windowWidth } = useWindowSize();

  const content = data?.items?.map((elem) => <Content key={elem?._key} data={elem} />);
  const flags = [data.isCore, data.isWill, data.isTrust];

  const [icons, setIcons] = useState();

  useEffect(() => {
    if (isOpen) {
      setIcons(
        flags.map((flag, i) => (
          <div key={i} className={cn('icons__svg', { icons__svg_show: !isOpen })}>
            {flag ? <PricingActiveCheck /> : <PricingNotCheckActive />}
          </div>
        ))
      );
    } else {
      setIcons(
        flags.map((flag, i) => (
          <div key={i} className={cn('icons__svg', { icons__svg_show: !isOpen })}>
            {flag ? <PricingNotActiveCheck /> : <PricingNotCheck />}
          </div>
        ))
      );
    }
  }, [isOpen]);

  // const icon = [
  //   <PricingStockOptions />,
  //   <PricingHealthCare />,
  //   <PricingPower />,
  //   <PricingGuardianship />,
  //   <PricingWill />,
  //   <PricingLastWill />,
  // ];

  useEffect(() => {
    const timeout = setTimeout(() => {
      const elHeight = elRef.current?.scrollHeight;

      if (windowWidth >= 1440) {
        setHeight(elHeight);
      } else if (windowWidth >= 768) {
        setHeight(elHeight);
      } else {
        setHeight(elHeight);
      }
    }, 333);

    return () => clearTimeout(timeout);
  }, [elRef.current, windowWidth, data]);

  const handleCloseClick = () => {
    //setHeight(0);
    // setTimeout(function () {
    //   setIsOpen(false);
    // }, 333);
    setIsOpen(!isOpen);
  };
  return (
    <div className={cn('container', { container_show: isOpen })}>
      <div className={cn('head', { head_show: isOpen })} onClick={handleCloseClick}>
        <div className={styles['head__header']}>
          <div className={styles['icon']} dangerouslySetInnerHTML={{ __html: data?.icon?.source }}></div>
          <div className={styles['title']}>{data?.title}</div>
        </div>
        <div className={cn('head__svg', 'icons')}>{icons}</div>
        <div className={cn('head__arrow', { head__arrow_open: isOpen }, { head__arrow_close: !isOpen })}>
          {/*{!isOpen ?*/}
          <PricingCloseArrow />
          {/*// : <PricingOpenArrow />}*/}
        </div>
      </div>
      <div
        className={cn('content', { content_show: isOpen })}
        ref={elRef}
        style={{ height: `${isOpen ? height : 0}px` }}
      >
        {content}
      </div>
    </div>
  );
}

export default ListContent;
