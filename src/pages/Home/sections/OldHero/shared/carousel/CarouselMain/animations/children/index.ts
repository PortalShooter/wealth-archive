import { opacityChildrenAnimation } from "./opacityChildrenAnimation";
import { noChildrenAnimation } from "./noChildrenAnimation";

import { ChildrenAnimation } from "./interface";
import { scaleChildrenAnimation } from "./scaleChildrenAnimation";

export type { ChildrenAnimation };

export {
  opacityChildrenAnimation,
  scaleChildrenAnimation,
  noChildrenAnimation,
};

export const childrenAnimations = {
  none: noChildrenAnimation,
  opacity: opacityChildrenAnimation,
  scale: scaleChildrenAnimation,
};
