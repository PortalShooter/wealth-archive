import React, { useCallback, useRef } from "react";
import { getElementOffset } from "../../utils/dom.utils";
import { simpleTween, SimpleTween } from "../../utils/animation.utils";
import { syncScroll, useScrollLock } from "..";
import { bezierEasings } from "../../../app/config/ease.config";

export interface UseScrollTo {
  (): {
    /**
     * Scrolls to a specific position in pixels.
     */
    scrollToPosition: (position: number) => void;
    /**
     * Scrolls to a top position of an element (accepts React Ref). Use an empty absolutely positioned element if you need a specific offset from a section.
     */
    scrollToElement: (
      element: React.MutableRefObject<HTMLElement | null>
    ) => void;
  };
}

export const useScrollTo: UseScrollTo = () => {
  const currentTween = useRef<SimpleTween<number> | null>(null);
  const scrollLock = useScrollLock();

  const scroll = useCallback((position: number) => {
    if (currentTween.current) {
      currentTween.current.kill();
    }

    currentTween.current = simpleTween<number>({
      from: syncScroll.get().top,
      to: position,
      ease: bezierEasings.easeSine,
      delay: 0,
      duration: 0.6
    }, (tick) => {
      // console.log(tick.value);
      if (scrollLock.locked) {
        // scrollLock.setBodyScroll(tick.value);
      } else {
        window.scrollTo(0, tick.value);
      }
    });
  }, [scrollLock.locked, scrollLock]);

  const scrollToPosition = useCallback((position: number) => {
    scroll(position);
  }, [scroll]);

  const scrollToElement = useCallback(
    (element: React.MutableRefObject<HTMLElement | null>) => {
      if (element.current) {
        scroll(getElementOffset(element.current).top);
      } else {
        console.warn("scrollToElement was called with a \"null\" element. May be ref wasn't initialized?")
      }
    },
    [scroll]
  );

  return {
    scrollToPosition,
    scrollToElement,
  };
};
