import React, { useEffect, useLayoutEffect, useRef, forwardRef } from "react";
import { getFocusable } from "../../utils/dom.utils";
import { CompositeAnimation } from "../../utils/animation.utils";

interface CarouselItemProps {
  /**
   * If element is a fake, created to fill the empty space
   */
  fake: boolean;
  children: React.ReactElement | React.ReactElement[];
  compositeAnimationRef: React.MutableRefObject<CompositeAnimation | null>;
  className: string;
  carouselItemRef: React.MutableRefObject<HTMLDivElement | null>;
  style: React.CSSProperties;
}

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export const CarouselItem = ({
  fake,
  children,
  compositeAnimationRef,
  className,
  carouselItemRef,
  style
}: CarouselItemProps) => {
  const wrapper = useRef<HTMLDivElement | null>(null);
  const compositeAnimation = useRef<CompositeAnimation>();

  useEffect(() => {
    if (!wrapper.current) return;

    const focusable = getFocusable(wrapper.current);

    if (fake) {
      focusable.forEach((el) => {
        el.setAttribute(
          "tabindex", "-1"
        );
      });
    }

    return () => {
      if (fake) {
        focusable.forEach((el) => {
          el.setAttribute(
            "tabindex", "0"
          );
        });
      }
    };
  }, [fake, children]);

  if (compositeAnimation.current) {
    compositeAnimationRef.current = compositeAnimation.current;
  }

  useIsomorphicLayoutEffect(() => {
    if (!wrapper.current) return;

    if (!compositeAnimation.current) {
      compositeAnimation.current = new CompositeAnimation({
        element: wrapper.current
      });

      compositeAnimationRef.current = compositeAnimation.current;
    }
  });

  return (
    <div ref={(element) => {
      carouselItemRef.current = element;
      wrapper.current = element;
    }} className={className} style={style}>
      {children}
    </div>
  );
}
