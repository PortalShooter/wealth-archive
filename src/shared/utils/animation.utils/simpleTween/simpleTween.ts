import { mix } from "../../math.utils";
import { mixArrays, subArrays } from "../../array.utils";
import { mixObjects, subObjects } from "../../object.utils";
import { fps } from "../";
import { animationConfig } from "../../../../app/config/animation.config";
import { bezierEasings, isEasing } from "../../../../app/config/ease.config";
import { NumbersObject, isNumbersObject } from "../../object.utils/types/types";
import { isNumbersArray } from "../../array.utils";

export type ValueType = number | number[] | NumbersObject | undefined;

export interface TweenStatus<T> {
  value: T;
  delta: T;
  progress?: number;
  easeProgress?: number;
}

export interface ExtendedTweenStatus<T> extends TweenStatus<T>{
  progress: number;
  easeProgress: number;
}

export interface TweenCallback<T> {
  (result: ExtendedTweenStatus<T>): void;
}

interface TweenOptions<T> {
  /**
   * Starting value of the Generic Type.
   */
  from: T;
  /**
   * End value of the Generic Type.
   */
  to: T;
  /**
   * Duration in seconds.
   */
  duration: number;
  /**
   * Ease function. You can get one from "bezierEasings" from "@app/ease.config".
   */
  ease: string | ((x: number) => number);
  /**
   * Delay before start in seconds.
   */
  delay: number;
}

export interface SimpleTween<T> {
  /**
   * Callback that is called when the value is changed
   */
  onUpdate: TweenCallback<T> | undefined;
  /**
   * Callback that is called when the tween is done
   */
  onComplete: TweenCallback<T> | undefined;
  /**
   * Can be used to set a function, that will call the local "loop" function
   */
  setParentLoop: () => (() => void);
  /**
   * Can be used to remove the parent function
   */
  removeParentLoop: () => void;
  /**
   * Kill the loop
   */
  kill: () => void;
  from: T | undefined;
  to: T | undefined;
  value: T | undefined;
  duration: number;
  killed: boolean;
}

export class SimpleTween<T extends ValueType> {
  private resolve: TweenCallback<T> | undefined;
  promise: Promise<ExtendedTweenStatus<T>> | undefined;

  from: T | undefined = undefined;
  to: T | undefined = undefined;
  value: T | undefined = undefined;
  duration = 0;

  killed: boolean = false;
  private ease: (x: number) => number;
  private frame: number;
  private progress: number;
  private easeProgress: number;
  private startTime: number;
  private delay: number;
  private resultFps: number;
  private parentLoopActive: boolean = false;
  private started: boolean = false;

  /**
   * SimpleTween Class
   * @param options Tween options
   * @param onUpdate Callback that is called when the value is changed
   * @param onComplete Callback that is called when the tween is done
   */
  constructor(
    { from, to, duration, ease, delay }: TweenOptions<T>,
    onUpdate: TweenCallback<T> | undefined,
    onComplete: TweenCallback<T> | undefined
  ) {
    this.onUpdate = onUpdate;
    this.onComplete = onComplete;

    if (isNumbersArray(from)) {
      (this.from as Array<number>) = from.slice();
      (this.value as Array<number>) = from.slice();
    } else if (typeof from === "object") {
      this.from = Object.assign({}, from);
      this.value = Object.assign({}, from);
    } else {
      this.from = from;
      this.value = from;
    }

    this.to = to;
    this.duration = duration;

    if (isEasing(ease)) {
      this.ease = bezierEasings[ease];
    } else if (typeof ease === "function") {
      this.ease = ease as (x: number) => number;
    } else {
      this.ease = (v) => {
        return v;
      };
    }

    this.frame = 0;
    this.progress = 0;
    this.easeProgress = 0;
    this.startTime = Date.now();

    this.delay = delay ? delay : 0;

    this.duration = duration;
    this.killed = false;

    this.resultFps = fps.get();
  }

  /**
   * Main loop function
   */
  loop = ():void => {
    if (this.killed) return;

    if (animationConfig.timeBasedAnimations) {
      const time = Date.now();
      this.progress =
        Math.max(0, time - this.startTime - this.delay * 1000) /
        (this.duration * 1000);
    } else {
      this.frame += 1;
      this.progress =
        Math.max(0, this.frame - this.delay * this.resultFps) /
        (this.duration * this.resultFps);
    }

    this.progress = Math.min(1, this.progress);

    if (this.ease) {
      this.easeProgress = this.ease(this.progress);
    } else {
      this.easeProgress = this.progress;
    }

    let newVal;
    let delta;

    if (isNumbersArray(this.from) && isNumbersArray(this.to)) {
      newVal = mixArrays(this.from, this.to, this.easeProgress);
      delta = subArrays(newVal as number[], this.value as number[]);
    } else if (isNumbersObject(this.from) && isNumbersObject(this.to)) {
      newVal = mixObjects(this.from as any, this.to as any, this.easeProgress);
      delta = subObjects(newVal as NumbersObject, this.value as NumbersObject);
    } else if (typeof this.from === "number" && typeof this.to === "number") {
      newVal = mix(this.from, this.to, this.easeProgress);
      delta = newVal - (this.value as number);
    } else {
      throw new Error(
        `unexpected value types for inputs: ${typeof this.from}, ${typeof this
          .to}`
      );
    }

    if (isNumbersArray(newVal)) {
      (this.value as Array<number>) = newVal.slice();
    } else if (isNumbersObject(newVal)) {
      (this.value as NumbersObject) = Object.assign({}, newVal);
    } else {
      (this.value as number) = newVal;
    }

    if (this.onUpdate) {
      this.onUpdate({
        value: this.value as T,
        delta: delta as T,
        progress: this.progress,
        easeProgress: this.easeProgress,
      });
    }

    if (this.progress >= 1) {
      this.killed = true;

      if (this.onComplete) {
        this.onComplete({
          value: this.value as T,
          delta: delta as T,
          progress: this.progress,
          easeProgress: this.easeProgress,
        });
      }

      if (this.resolve) {
        this.resolve({
          value: this.value as T,
          delta: delta as T,
          progress: this.progress,
          easeProgress: this.easeProgress,
        });
      }

      return;
    }

    if (!this.parentLoopActive) {
      requestAnimationFrame(this.loop);
    }
  };

  /**
   * Inner function to sturt the tween. Tween starts automaticly
   */
  start = () => {
    if (this.started) return;
    this.started = true;

    this.promise = new Promise((resolve: TweenCallback<T>) => {
      this.resolve = resolve;
    });

    if (!this.parentLoopActive) {
      this.loop();
    }
  }

  /**
   * Kills the tween
   */
  kill = () => {
    this.killed = true;
  }

  setParentLoop = () => {
    this.parentLoopActive = true;
    return this.loop;
  }

  removeParentLoop = () => {
    this.parentLoopActive = false;
  }
}

/**
 * Function creates new tween
 * @param options Tween options
 * @param onUpdate Callback that is called when the value is changed
 * @param onComplete Callback that is called when the tween is done
 * @returns tween object
 */
export function simpleTween<T extends ValueType>(
  options: TweenOptions<T>,
  onUpdate?: TweenCallback<T>,
  onComplete?: TweenCallback<T>
) {
  const tween = new SimpleTween<T>(options, onUpdate, onComplete);
  tween.start();

  return tween;
}
