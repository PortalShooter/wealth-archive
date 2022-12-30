import type { UseAnimation } from "./interface";
import { useFadeAnimation } from "./useFadeAnimation";
import { useNoAnimation } from "./useNoAnimation";

export type {
  UseAnimation
}

export {
  useFadeAnimation,
  useNoAnimation
}

export const animationList = {
  fade: useFadeAnimation,
  none: useNoAnimation
}