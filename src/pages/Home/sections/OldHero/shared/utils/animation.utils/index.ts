import { simpleTween, SimpleTween, TweenStatus, ValueType, ExtendedTweenStatus } from "./simpleTween/simpleTween"
import { TweenComposer } from "./tweenComposer/TweenComposer"
import { transition, Transition } from "./transition/transition"
import { createLoop, LoopInterface } from "./createLoop/createLoop"
import { CompositeAnimation } from "./compositeAnimation/CompositeAnimation" 
import fps from "./fps/fps"

export {
  simpleTween,
  TweenComposer,
  transition,
  createLoop,
  fps,
  CompositeAnimation,
}

export type { SimpleTween, Transition, LoopInterface, TweenStatus, ValueType, ExtendedTweenStatus }
