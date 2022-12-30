import BezierEasing from "./bezier-easing.lib.js";

export type Easing =
  | "default"
  | "ease"
  | "easeOut"
  | "easeIn"
  | "easePower2"
  | "easePower3"
  | "easePower4"
  | "easeSine"
  | "easeInPower2"
  | "easeInPower3"
  | "easeOutPower2"
  | "easeOutPower3";

export const easingTypes = {
  default: "default",
  ease: "ease",
  easeOut: "easeOut",
  easeIn: "easeIn",
  easePower2: "easePower2",
  easePower3: "easePower3",
  easePower4: "easePower4",
  easeSine: "easeSine",
  easeInPower2: "easeInPower2",
  easeInPower3: "easeInPower3",
  easeOutPower2: "easeOutPower2",
  easeOutPower3: "easeOutPower3",
};

export const isEasing = (value: any | string): value is Easing => {
  return (
    Object.values(easingTypes).indexOf(value) !== -1
  );
};

export type BezierEasingList = {
  [index in Easing]: (x: number) => number;
};

export const bezierEasings: BezierEasingList = {
  ease: BezierEasing(1, 0, 0, 1),
  easeOut: BezierEasing(0.19, 1, 0.22, 1),
  easeIn: BezierEasing(0.95, 0.05, 0.795, 0.035),
  default: BezierEasing(0.25, 0.1, 0.25, 1),
  easePower2: BezierEasing(0.77, 0, 0.175, 1),
  easePower3: BezierEasing(0.645, 0.045, 0.355, 1),
  easePower4: BezierEasing(0.86, 0, 0.07, 1),
  easeSine: BezierEasing(0.445, 0.05, 0.55, 0.95),
  easeInPower2: BezierEasing(0.55, 0.055, 0.675, 0.19),
  easeInPower3: BezierEasing(0.55, 0.085, 0.68, 0.53),
  easeOutPower2: BezierEasing(0.25, 0.46, 0.45, 0.94),
  easeOutPower3: BezierEasing(0.215, 0.61, 0.355, 1),
};

export type CSSEasingList = {
  [index in Easing]: string;
};

export const cssEasings: CSSEasingList = {
  ease: "cubic-bezier(1, 0, 0, 1)",
  easeOut: "cubic-bezier(0.19, 1, 0.22, 1)",
  easeIn: "cubic-bezier(0.95, 0.05, 0.795, 0.035)",
  default: "cubic-bezier(0.25, 0.1, 0.25, 1)",
  easePower2: "cubic-bezier(0.77, 0, 0.175, 1)",
  easePower3: "cubic-bezier(0.645, 0.045, 0.355, 1)",
  easePower4: "cubic-bezier(0.86, 0, 0.07, 1)",
  easeSine: "cubic-bezier(0.445, 0.05, 0.55, 0.95)",
  easeInPower2: "cubic-bezier(0.55, 0.055, 0.675, 0.19)",
  easeInPower3: "cubic-bezier(0.55, 0.085, 0.68, 0.53)",
  easeOutPower2: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  easeOutPower3: "cubic-bezier(0.215, 0.61, 0.355, 1)",
};
