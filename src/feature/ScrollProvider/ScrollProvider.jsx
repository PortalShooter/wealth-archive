import React, { useContext,useEffect,useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useMotionValue } from 'framer-motion';
import {useWindowSize} from '@/hooks';
// Styles
import classnames from "classnames/bind";
import styles from './ScrollProvider.module.scss';

const cn = classnames.bind(styles);

const clamp = (num, min, max) => num <= min ? min : num >= max ? max : num;

const ScrollTriggerContext = React.createContext(null);

export const useScrollTrigger = () => useContext(ScrollTriggerContext);





export const ScrollProvider = (
  {
   children,
   animationAllowedPermanent = false,
   frozenProgress = 1,
   forward,
    mobileDisable

 }) => {
  const windowWidth = useWindowSize().windowWidth;
  const elInView = useInView();
  let lastKnownScrollPosition = 0;
  let ticking = false;
  const progress = useMotionValue(animationAllowedPermanent?frozenProgress:0);

  const parallaxScroll = (scrollY) => {
    if (elInView.inView) {
      const windowTop = scrollY;
      const elementTop = elInView.entry.target.offsetTop;
      const scrolled = windowTop - elementTop;
      const scrollProgress = scrolled / elInView.entry.target.clientHeight;
      if (!isMobileDisable) {
        if (forward) {
          if (scrollProgress > progress.current) {
            progress.set(clamp(scrollProgress, 0, 1));
          }
        } else {
          progress.set(clamp(scrollProgress, 0, 1));
        }
      }
    }
  };

  const discoverAnimationFrame = () => {
    lastKnownScrollPosition = window.scrollY;
    if (!ticking) {
      window.requestAnimationFrame(() => {
        parallaxScroll(lastKnownScrollPosition);
        ticking = false;
      });
      ticking = true;
    }
  };

  const [next,setNext] =  useState(null);
  const [isMobileDisable,setIsMobileDisable] =  useState(false);

  useEffect(()=>{
    setIsMobileDisable(mobileDisable && mobileDisable >= windowWidth)
  },[windowWidth])

   useEffect(()=>{
     setNext(document.getElementById('__next'));
   },[])


  useEffect(() => {
    if (elInView.inView) {
      window.addEventListener('scroll', discoverAnimationFrame);
    }
    //return () => next && next.removeEventListener('scroll', discoverAnimationFrame);
    return () => window.removeEventListener('scroll', discoverAnimationFrame);
  }, [elInView.inView]);


  return (
    <div ref={elInView.ref} className={cn('scroll-provider')}>
      <ScrollTriggerContext.Provider  value={{progress}}>{children}</ScrollTriggerContext.Provider>
    </div>
  );
};

// export { ScrollProvider, useScrollTrigger };
