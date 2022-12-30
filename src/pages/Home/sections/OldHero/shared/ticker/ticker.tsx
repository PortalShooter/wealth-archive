import { useCallback, useRef, useEffect } from "react";

import { syncScroll } from "../scroll";
import { syncResize } from "../resize";

import { getElementOffset } from "../utils/dom.utils";
import { createLoop, LoopInterface } from "../utils/animation.utils";

// Styles
const classNames = require("classnames/bind");
import styles from "./Ticker.module.css";
const cx = classNames.bind(styles);

export interface TickerProps {
  children: React.ReactChild | string;
  className?: string;
  speed?: number;
  shift?: number;
}

export const Ticker = ({
  className,
  children,
  speed = 1,
  shift = 0,
}: TickerProps) => {
  const tickerRef = useRef<HTMLDivElement | null>(null);
  const spanRef = useRef<HTMLSpanElement | null>(null);
  const loopRef = useRef<LoopInterface | null>(null);
  const heightRef = useRef<number>(0);
  const offsetTopRef = useRef<number>(0);
  const itemWidthRef = useRef<number>(0);
  const onScreenRef = useRef<boolean>(false);
  const shiftRef = useRef<number>(shift);

  const mediaQuery =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)")
      : null;
  const reducedMotion = mediaQuery && mediaQuery.matches ? true : false;

  const handleScroll = useCallback(() => {
    if (syncScroll.get().locked) return;

    const scrolled = syncScroll.get().top;
    const windowHeight = syncResize.get().height;

    if (tickerRef.current) {
      if (
        scrolled + windowHeight >= offsetTopRef.current &&
        scrolled <= offsetTopRef.current + heightRef.current
      ) {
        onScreenRef.current = true;
      } else {
        onScreenRef.current = false;
      }
    }
  }, []);

  const handleResize = useCallback(() => {
    if (tickerRef.current && spanRef.current) {
      let ww = syncResize.get().width;

      heightRef.current = tickerRef.current.clientHeight;
      offsetTopRef.current = getElementOffset(tickerRef.current).top;

      while (tickerRef.current.firstChild) {
        tickerRef.current.removeChild(tickerRef.current.firstChild);
      }

      tickerRef.current.appendChild(spanRef.current);
      itemWidthRef.current = spanRef.current.clientWidth;

      const n = itemWidthRef.current
        ? Math.max(1, Math.ceil(ww / itemWidthRef.current))
        : 1;

      for (let i = 0; i < n; i++) {
        tickerRef.current.appendChild(spanRef.current.cloneNode(true));
      }
    }

    handleScroll();
  }, [handleScroll]);

  const loop = useCallback(
    (multiplier) => {
      if (reducedMotion || !onScreenRef.current) {
        return;
      }

      if (itemWidthRef.current && tickerRef.current) {
        shiftRef.current =
          (shiftRef.current - speed * multiplier) % itemWidthRef.current;

        tickerRef.current.style.transform = `translateX(${
          speed > 0 ? shiftRef.current : shiftRef.current - itemWidthRef.current
        }px) translateZ(0px)`;
      }
    },
    [speed, reducedMotion]
  );

  useEffect(() => {
    loopRef.current = createLoop(loop);
    if (tickerRef.current && loopRef.current) {
      spanRef.current = tickerRef.current.getElementsByTagName("span")[0];
      handleResize();
      handleScroll();

      syncResize.subscribe(handleResize);
      syncScroll.subscribe(handleScroll);

      loopRef.current.start();
    }

    return () => {
      syncResize.unsubscribe(handleResize);
      syncScroll.unsubscribe(handleScroll);

      loopRef.current && loopRef.current.kill();
    };
  }, [loop, handleResize, handleScroll]);

  return (
    <div className={cx("Ticker", className)}>
      <div className={cx("Ticker__wrapper")} ref={tickerRef}>
        {children}
      </div>
    </div>
  );
};
