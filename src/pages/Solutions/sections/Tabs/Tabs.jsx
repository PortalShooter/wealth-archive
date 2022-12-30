import React, { useEffect, useRef, useState } from 'react';

// Hooks
import { useInView } from 'react-intersection-observer';
import { useHover, useScrollInView } from '@/hooks';

// Components
import SvgSolutionsTab1 from '@/svgComponents/SolutionsTab1';
import SvgSolutionsTab2 from '@/svgComponents/SolutionsTab2';
import SvgSolutionsTab3 from '@/svgComponents/SolutionsTab3';
import SvgSolutionsTab4 from '@/svgComponents/SolutionsTab4';
import SvgSolutionsTab5 from '@/svgComponents/SolutionsTab5';
import SvgSolutionsGirlSmall from '@/svgComponents/SolutionsGirlSmall';
import OneTab from './OneTab';

// Styles
import classnames from 'classnames/bind';
import styles from './Tabs.module.scss';

const cn = classnames.bind(styles);

const Tabs = ({ tabsObj, className }) => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    if (window && window.screen.width > 1024) {
      setIsDesktop(true);
    } else {
      setIsDesktop(false);
    }
  }, []);

  const text = useRef();
  const arr = ['tab1', 'tab2', 'tab3', 'tab4', 'tab5'];
  const svgArr = arr.reduce((acc, svgName) => {
    if (svgName === 'tab1') {
      isDesktop
        ? acc.push(<SvgSolutionsTab1 className={cn('advance_img')} />)
        : acc.push(<SvgSolutionsGirlSmall className={cn('advance_img')} />);
    }
    if (svgName === 'tab2') {
      acc.push(<SvgSolutionsTab2 className={cn('advance_img')} />);
    }
    if (svgName === 'tab3') {
      acc.push(<SvgSolutionsTab3 className={cn('advance_img')} />);
    }
    if (svgName === 'tab4') {
      acc.push(<SvgSolutionsTab4 className={cn('advance_img')} />);
    }
    if (svgName === 'tab5') {
      acc.push(<SvgSolutionsTab5 className={cn('advance_img')} />);
    }

    return acc;
  }, []);

  const [currentTab, setCurrentTab] = useState(0);
  const [currentTabData, setCurrentTabData] = useState(tabsObj[0]);

  const [hoverRef, isHovered] = useHover();
  const [hoverRefTabs, isHoverRefTabs] = useHover();

  const handleTabClick = (index) => {
    setCurrentTab(index);
    setCurrentTabData(tabsObj[index]);
  };

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

  const tabs = tabsObj.map((tab, index) => {
    return (
      <div
        className={cn(`tabs__block_inner`, className, { tabs__block_active: index === currentTab })}
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
        <div className={cn('tabs__wrap')}>
          <div className={cn('tabs__block', className)} ref={hoverRefTabs}>
            {tabs}
          </div>
          <hr className={cn(className)} />
        </div>
      </div>
      <div ref={hoverRef}>
        {/*<OneTab tabObj={currentTabData}>{svgArr[currentTab]}</OneTab>*/}
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
