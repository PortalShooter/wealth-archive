import React, { useEffect, useRef, useState } from 'react';

// Hooks
import { useInView } from 'react-intersection-observer';
import {useHover, useScrollInView} from '@/hooks';

// Components
import {AdvisersTab1,  AdvisersTab2,  AdvisersTab3, AdvisorsTablet, AdvisorsMobile} from '@/svgComponents';
import OneTab from './OneTab';

// Styles
import classnames from 'classnames/bind';
import styles from './Tabs.module.scss';

const cn = classnames.bind(styles);

const Tabs = ({ tabsObj, data }) => {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    if (window && window.screen.width > 1024) {
      setIsDesktop(true);
      setIsTablet(false);
    } else if (window && window.screen.width > 767 && window.screen.width < 1025) {
      setIsDesktop(false);
      setIsTablet(true);
    } else {
      setIsDesktop(false);
      setIsTablet(false);
    }
  }, []);

  const text = useRef();
  const arr = ['tab1', 'tab2', 'tab3'];
  const svgArr = arr.reduce((acc, svgName) => {
    if (svgName === 'tab1') {
      acc.push(<AdvisersTab2 className={cn('advance_img')} />);
    }
    if (svgName === 'tab2') {
      acc.push(<AdvisersTab3 className={cn('advance_img')} />);
    }
    if (svgName === 'tab3') {
      isDesktop
        ? acc.push(<AdvisersTab1 className={cn('advance_img')} />)
        : isTablet
        ? acc.push(<AdvisorsTablet className={cn('advance_img')} />)
        : acc.push(<AdvisorsMobile className={cn('advance_img')} />);
    }

    return acc;
  }, []);

  const [currentTab, setCurrentTab] = useState(0);
  const [currentTabData, setCurrentTabData] = useState(tabsObj[0]);

  const [hoverRef, isHovered] = useHover();
  const [hoverRefTabs, isHoverRefTabs] = useHover();

  const [isStart, setIsStart] = useState(false);

  const logos = useInView({
    rootMargin: '-100px',
    triggerOnce: true,
  });

  isStart
    ? useInterval(
        () => {
          if (tabs.length > currentTab + 1) {
            setCurrentTab((currentTab) => currentTab + 1);
            setCurrentTabData(tabsObj[currentTab + 1]);
          } else {
            setCurrentTab(0);
            setCurrentTabData(tabsObj[0]);
          }
        },
        10000,
        isHovered || isHoverRefTabs
      )
    : useInterval(() => {}, 1000000, isHovered || isHoverRefTabs);

  useEffect(() => {
    setIsStart(logos.inView);
  }, [logos.inView]);

  const handleTabClick = (index) => {
    setCurrentTab(index);
    setCurrentTabData(tabsObj[index]);
  };

  const tabs = tabsObj.map((tab, index) => {
    return (
      <div
        className={cn(`tabs__block_inner`, { tabs__block_active: index === currentTab })}
        onClick={() => handleTabClick(index)}
        key={tab.title}
      >
        {tab.title}
      </div>
    );
  });

  return (
    <section className={cn('tabs', useScrollInView(text).spawnAnimation)} ref={text}>
      <div className={cn('tabs__scroll', logos.inView)} ref={logos.ref}>
        <div className={styles['tabs__block']} ref={hoverRefTabs}>
          {tabs}
        </div>
        <hr />
      </div>
      <div ref={hoverRef}>
        <OneTab tabObj={currentTabData}/>
      </div>
    </section>
  );
};

function useInterval(callback, delay, isHovered) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!isHovered && window.screen.width > 1024) {
      function tick() {
        savedCallback.current();
      }
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay, isHovered]);
}

export default Tabs;
