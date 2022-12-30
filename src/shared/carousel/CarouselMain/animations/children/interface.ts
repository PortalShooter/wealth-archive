import React from "react";
import { CompositeAnimation } from "../../../../utils/animation.utils";

interface AnimationItem {
  position: number;
  fake: boolean;
  index: number;
  compositeAnimationRef: React.RefObject<CompositeAnimation | null>;
  ref: React.RefObject<HTMLDivElement | null>;
}

export interface ChildrenAnimation {
  (animationProperties: {
    elements: AnimationItem[];
    speed: number;
    carouselPosition: number;
    unnormalizedCarouselPosition: number;
    containerWidth: number;
    totalWidth: number;
    itemWidth: number;
    gapWidth: number;
    align: "left" | "center";
  }): void;
}
