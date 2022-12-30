import React from "react";
import type { CarouselChildrenAnimation } from "./shared/carousel/CarouselMain";
import { scaleChildrenAnimation } from "./shared/carousel/CarouselMain/animations/children/scaleChildrenAnimation";
import { syncResize } from "./shared/resize";

type CarouselAnimationParams = Parameters<CarouselChildrenAnimation>[0];

interface CarouselBrandAnimationOptions extends CarouselAnimationParams {
  header: React.RefObject<HTMLElement>;
}

interface CarouselBrandAnimation {
  (options: CarouselBrandAnimationOptions): void;
}

let currentPosition = 0;

export const carouselChildrenAnimation: CarouselBrandAnimation = ({
  align,
  carouselPosition,
  unnormalizedCarouselPosition,
  containerWidth,
  elements,
  gapWidth,
  header,
  itemWidth,
  speed,
  totalWidth,
}) => {
  const ww = syncResize.get().width;

  if (header.current) {
    currentPosition += speed / 3500;
    currentPosition = Math.max(
      -Math.PI / 2,
      Math.min(Math.PI / 2, currentPosition)
    );

    header.current.style.transform = `translateX(${
      (ww / 10) * Math.sin(currentPosition)
    }px) translateZ(0px)`;
  }

  scaleChildrenAnimation({
    align,
    carouselPosition,
    unnormalizedCarouselPosition,
    containerWidth,
    elements,
    gapWidth,
    itemWidth,
    speed,
    totalWidth,
  });
};
