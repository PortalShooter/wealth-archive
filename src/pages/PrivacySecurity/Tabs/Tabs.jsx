import React, { useCallback, useEffect, useRef, useState } from 'react';

import styles from './Tabs.module.scss';
import classnames from 'classnames/bind';
import { useScrollInView, useBodyClass } from '@/hooks';
import OneTab from './OneTab';
import { syncScroll } from '@/pages/Home/sections/OldHero/shared/scroll';
import { syncResize } from '@/pages/Home/sections/OldHero/shared/resize';
import { getElementOffset } from '@/pages/Home/sections/OldHero/shared/utils/dom.utils';
import { throttle } from '@/helpers';
const cn = classnames.bind(styles);

const Tabs = ({ tabsObj }) => {
  const tabRef = useRef();
  const tabsRef = useRef();
  useBodyClass(cn('privacy-security-page'));

  const [currentTab, setCurrentTab] = useState(0);

  const offsetTopRef = useRef(0);
  const scrollNum = useRef(0);
  scrollNum.current = getElementOffset(tabsRef.current).top;
  const currentNum = scrollNum.current;
  const [scrollOpen, setScrollOpen] = useState(0);
  const heightRef = useRef(0);

  const handleTabClick = (index) => {
    setCurrentTab(index);
    setTimeout(() => {
      window.scrollTo(0, window.scrollY - 1);
      requestAnimationFrame(() => {
        window.scrollTo(0, window.scrollY + 1);
      });
    }, 1000);
  };

  const handleScroll = useCallback(
    throttle(() => {
      const scrolled = syncScroll.get().top;
      const windowHeight = syncResize.get().height;

      if (scrolled > offsetTopRef.current) {
        setScrollOpen(true);
      } else {
        setScrollOpen(false);
      }
    }, 500),
    []
  );

  const handleResize = useCallback(
    throttle(() => {
      heightRef.current = tabsRef.current.clientHeight;
      offsetTopRef.current = getElementOffset(tabsRef.current).top;
    }, 500),
    [handleScroll]
  );

  useEffect(() => {
    handleScroll();
    handleResize();
    syncScroll.subscribe(handleScroll);
    syncResize.subscribe(handleResize);
    return () => {
      syncResize.unsubscribe(handleResize);
      syncScroll.unsubscribe(handleScroll);
    };
  }, [handleScroll, handleResize]);

  const tabs = tabsObj?.tab.map((tab, index) => {
    return (
      <a
        className={cn(`tabs__block_inner`, { tabs__block_active: index === currentTab })}
        onClick={() => handleTabClick(index)}
        key={tab.title}
        href={(index === 0 && '#security') || (index === 1 && '#privacy') || (index === 2 && '#terms')}
      >
        {tab.title}
      </a>
    );
  });

  return (
    <section className={cn('tabs')}>
      {!scrollOpen ? (
        <div className={cn('tabs__scroll', useScrollInView(tabsRef).spawnAnimation)} ref={tabsRef}>
          <div className={styles['tabs__block']}>{tabs}</div>
          <hr />
        </div>
      ) : (
        <div className={cn('tabs__scroll_active', useScrollInView(tabsRef).spawnAnimation)} ref={tabsRef}>
          <div className={styles['tabs__block']}>{tabs}</div>
        </div>
      )}

      <div>
        <div className={cn('tabs__oneTab', useScrollInView(tabRef).spawnAnimation)} ref={tabRef}>
          <OneTab questions={tabsObj?.question} setCurrentTab={setCurrentTab} />
        </div>
      </div>
    </section>
  );
};

export default Tabs;
