import { opacityChildrenAnimation } from "./opacityChildrenAnimation";
import { noChildrenAnimation } from "./noChildrenAnimation";

import { ChildrenAnimation } from "./interface";

export type {
  ChildrenAnimation
}

export {
  opacityChildrenAnimation,
  noChildrenAnimation
}

export const childrenAnimations = {
  none: noChildrenAnimation,
  opacity: opacityChildrenAnimation
}