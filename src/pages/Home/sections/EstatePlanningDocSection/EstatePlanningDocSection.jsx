import React, {useEffect, useRef, useState} from 'react';

// Hooks
import { useInView } from 'react-intersection-observer';
import {useHover, useScrollInView} from '@/hooks'
import {useWindowSize} from '@/hooks';

// Components
import {Section} from "@/feature/Section";
import {Container} from "@/feature/Container";
import {TextBlock} from "@/feature/TextBlock";
import {Link} from "@/feature/Link";
import {Image} from "@/feature/Image";
import {getImgUrl} from "@/shared/utils/sanity.utils";


// Styles
import classnames from "classnames/bind";
import styles from './EstatePlanningDocSection.module.scss';
import {syncResize} from "@/shared/resize";

const cn = classnames.bind(styles);


function useInterval(callback, delay, isHovered, isHoveredImg, inView) {
  const savedCallback = useRef();
  const windowWidth = useRef();
  const intervalRef = useRef();
  const [isDesktop, setIsDesktop] = useState(false);

  const handleResize = () => {
    windowWidth.current = window && window.innerWidth
    setIsDesktop(windowWidth.current > 1024)
  }

  useEffect(() => {
    handleResize();
    syncResize.subscribe(handleResize);

    return () => {
      syncResize.unsubscribe(handleResize);
    }
  }, [])

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (isHovered || isHoveredImg || windowWidth.current <= 1024) {
      clearInterval(intervalRef.current);
      return;
    }

    if (inView) {
      function tick() {
        savedCallback.current();
      }

      intervalRef.current = setInterval(tick, delay);
    }

    return () => clearInterval(intervalRef.current);
  }, [delay, isHovered, isHoveredImg, isDesktop, inView]);
}

function EstatePlanningDocSection({data}) {
  const {tabs, title, btn} = data
  const textRef = useRef(null)
  const imgRef = useRef(null)

  const [hoverRef, isHovered] = useHover();
  const [hoverRefImg, isHoveredImg] = useHover();
  const [tabActive, setTabActive] = useState(0)
  const [windowWidth, setWindowWidth] = useState(0);
  const EstatePlanningTabDurationMs = 15000;
  const leftScrollOffset = 24;
  const hookedWindowWidth = useWindowSize().windowWidth;

  const [refTabs, inView] = useInView({
    rootMargin: '200px',
    triggerOnce: true,
  });

  useEffect(() => {
    setWindowWidth(hookedWindowWidth)
  }, [])

  useEffect(() => {
    if (inView) {
      setTabActive(0)
    }
  }, [inView])

  useInterval(() => {
    if (tabs.length > tabActive + 1) {
      setTabActive(oldTabActive => oldTabActive + 1);
    } else {
      setTabActive(0);
    }
  }, EstatePlanningTabDurationMs, isHovered, isHoveredImg, inView);

  const handleTabClick = (ev, index) => {
    setTabActive(index);

    // just in case, ev.target.offsetLeft is always 0 at column mode
    if (window.innerWidth < 768) {
      const scrollToX = ev.currentTarget.offsetLeft - leftScrollOffset;
      hoverRef.current.scrollTo(scrollToX, 0);
    }
  }

  return (
    <Section className={cn('estate-planning')} isPaddingTop>
      <Container className={cn('estate-planning__wrap')}>
        <TextBlock
          textRef={textRef}
          accentPhrase={title.accentPhrase}
          headingText={title.title}
          tagName='h2'
          headingStyles='h2'
          className={cn('estate-planning__text', useScrollInView(textRef, {title: true}).titleSpawn)}
          align="center"
        />

        <div ref={hoverRefImg} className={cn('estate-planning__content')}>
          <div ref={imgRef} className={cn('estate-planning__card', useScrollInView(imgRef).spawnAnimation)}>
            <Image
              wrapperClassName={cn('estate-planning__img')}
              src={getImgUrl(tabs[tabActive].tabImage.image.asset)}
              layout='fill'
              objectFit='contain'
            />

            <p className={cn('estate-planning__description')}>
              {tabs[tabActive].tabDescription}
            </p>
          </div>

          <div ref={refTabs} className={cn('estate-planning__tabs-wrap')}>
            <div ref={hoverRef} className={cn('estate-planning__tabs')}
                 style={{'--estate-planning-tab-duration': `${EstatePlanningTabDurationMs}ms`}}
            >
              {tabs.map((tab, index) => {
                const tabRef = useRef(null)

                return (
                  <button key={`epl${index}`}
                          ref={tabRef}
                          onClick={(ev) => handleTabClick(ev, index)}
                          className={cn(
                            'estate-planning__tab',
                            {'estate-planning__tab_active': tabActive === index && inView},
                            {'estate-planning__tab_disabled-progress-animation': isHovered || isHoveredImg || windowWidth <= 768},
                            useScrollInView(tabRef, {staticVisible: windowWidth <= 768, title: true}).spawnAnimation,
                          )}>
                    {tab.tabTitle}
                  </button>
                )
              })}
            </div>

            <Link variant="button-fill" className={cn('estate-planning__link')} href={btn.link}>
              {btn.name}
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  )
}

export default EstatePlanningDocSection
