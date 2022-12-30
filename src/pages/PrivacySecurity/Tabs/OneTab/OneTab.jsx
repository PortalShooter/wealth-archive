import React, { useCallback, useEffect, useRef, useState } from 'react';

import styles from './OneTab.module.scss';
import classnames from 'classnames/bind';
import SvgSolutionsArrowUp from '@/svgComponents/SolutionsArrowUp';
import { syncScroll } from '@/pages/Home/sections/OldHero/shared/scroll';
import { syncResize } from '@/pages/Home/sections/OldHero/shared/resize';
import { getElementOffset } from '@/pages/Home/sections/OldHero/shared/utils/dom.utils';
import { throttle } from '@/helpers';
const cn = classnames.bind(styles);

const Question = ({ item }) => {
  const [opened, setOpened] = useState(false);

  const handleOpened = () => {
    setOpened((oldOpened) => !oldOpened);
  };

  return (
    <div
      className={cn('questions__block-external', { 'questions__block-external_open': opened })}
      onClick={handleOpened}
    >
      <div className={cn('questions__block-inner')}>
        <div className={cn('questions__block-header')}>
          <h3 className={cn('questions__item-title')}>{item.title}</h3>
          <SvgSolutionsArrowUp className={cn('questions__arrow', { 'questions__arrow-up': opened })} />
        </div>
        {/*{opened && <div className={cn('questions__text', { questions__text_opened: opened })}>{item.description}</div>}*/}
        <div className={cn('questions__text', { questions__text_opened: opened })}>{item.description}</div>
      </div>
      <hr />
    </div>
  );
};

const OneTab = ({ questions, setCurrentTab }) => {
  const oneTab = useRef(null);
  const twoTab = useRef(null);
  const threeTab = useRef(null);

  const handleScroll = useCallback(
    throttle(() => {
      const scrolled = syncScroll.get().top;
      if (scrolled >= getElementOffset(twoTab.current).top && scrolled < getElementOffset(threeTab.current).top) {
        setCurrentTab(1);
      } else if (scrolled >= getElementOffset(threeTab.current).top) {
        setCurrentTab(2);
      } else {
        setCurrentTab(0);
      }
    }, 500),
    []
  );

  useEffect(() => {
    handleScroll();
    syncScroll.subscribe(handleScroll);
    return () => {
      syncScroll.unsubscribe(handleScroll);
    };
  }, [handleScroll]);

  return (
    <div>
      {questions?.map((item, index) => {
        return (
          <section
            className={cn('questions')}
            key={`tabquestions${index}`}
            id={(index === 0 && 'security') || (index === 1 && 'privacy') || (index === 2 && 'terms')}
            ref={(index === 0 && oneTab) || (index === 1 && twoTab) || (index === 2 && threeTab)}
          >
            <div className={cn('questions__wrapper')}>
              <h2 className={cn('questions__title')}>{item.title}</h2>
              <h3 className={cn('questions__subtitle')}>{item.description}</h3>
              <hr />
              <div className={cn('questions__block')}>
                {item.question &&
                  item.question.map((item, index) => {
                    return <Question item={item} key={item.title + index} />;
                  })}
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default OneTab;
