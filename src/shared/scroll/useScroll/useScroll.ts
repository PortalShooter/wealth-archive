import { useState, useEffect, useMemo, useRef, useCallback } from "react";

interface ScrollPosition {
  top: number;
  left: number;
};

interface ScrollData extends ScrollPosition {
  get: () => ScrollPosition
}

interface UseScroll {
  (): ScrollData;
}

/**
 * Returns current window scroll position
 * @returns Top and left values for the scroll
 */
export const useScroll: UseScroll = () => {
  const scrollRef = useRef<ScrollPosition>({
    top: 0,
    left: 0,
  });

  const [scroll, setState] = useState(scrollRef.current);

  const onScroll = useCallback(() => {
    scrollRef.current = {
      top: window.scrollY,
      left: window.scrollX,
    };

    setState(scrollRef.current);
  }, []);

  const get = useCallback(() => {
    return scrollRef.current;
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });

    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [onScroll]);

  return useMemo(() => {
    return {
      top: scroll.top,
      left: scroll.left,
      get,
    };
  }, [scroll.top, scroll.left, get]);
};
