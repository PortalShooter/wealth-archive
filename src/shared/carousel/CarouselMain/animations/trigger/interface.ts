import React from "react";
import { CompositeAnimation } from "../../../../utils/animation.utils";

export interface AnimationItem {
  position: number;
  fake: boolean;
  index: number;
  compositeAnimationRef: React.RefObject<CompositeAnimation | null>;
  ref: React.RefObject<HTMLDivElement | null>;
}

export interface TriggerAnimation {
  (animationProperties: {
    elements: AnimationItem[];
    carouselPosition: number;
    containerWidth: number;
    totalWidth: number;
    itemWidth: number;
    gapWidth: number;
    align: "left" | "center";
    triggered: boolean;
    immidiate: boolean;
  }): void;
}
