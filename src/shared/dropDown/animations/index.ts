import { AnimationNone } from "./animationNone";
import { AnimationDefault } from "./animationDefault";
import type { Animation, AnimationOptions } from "./interface";

export type {
  Animation,
  AnimationOptions
}

export const animationList = {
  Default: AnimationDefault,
  None: AnimationNone
}