import { SimpleTween, TweenStatus, ValueType } from "../";
import { addArrays, subArrays } from "../../array.utils";
import { addObjects } from "../../object.utils";
import { isNumbersObject, NumbersObject } from "../../object.utils/types/types";
import { subObjects } from "../../object.utils/subObjects/subObjects";

export interface TweenComposer<T> {
  push(tween: SimpleTween<T>):void;
  remove(tween: SimpleTween<T>):void;
  kill: () => void;
}

interface TweenComposerCallback<T> {
  (result: TweenStatus<T>): void;
}

interface TweenItem<T extends ValueType> {
  tween: SimpleTween<T>;
  loop: () => void;
}

/**
 * Checks if variable is an array of numbers
 * @param p Value
 * @returns Boolean
 */
const isNumbersArray = (p: any): p is number[] => {
  if (!Array.isArray(p)) return false;

  let result = true;
  p.forEach((val) => {
    if (typeof val !== "number") {
      result = false;
    }
  });

  return result;
};

/**
 * Copies tween value
 * @param p Value
 * @returns Copy
 */
const copyValue = <T extends ValueType>(p: T):T => {
  if (isNumbersArray(p)) {
    return p.slice() as T;
  } else if (typeof p === "object") {
    return Object.assign({}, p as T);
  } else {
    return p;
  }
}

export class TweenComposer<T extends ValueType> implements TweenComposer<T> {
  private tweens:Array<TweenItem<T>> = [];
  private onUpdate;
  private killed: boolean = false;
  private empty: boolean = true;
  private pendingTicks: Array<TweenStatus<T>> = [];
  
  private previousValue: T | undefined = undefined;
  value: T | undefined = undefined;
  delta: T | undefined = undefined;

  /**
   * Allows usage of multiple tweens on a same object
   * @param onUpdate Callback, called when value is changed. Recieves object with a current value and a delta value as a parameter
   */
  constructor(onUpdate: TweenComposerCallback<T>) {
    this.onUpdate = onUpdate;
  }

  /**
   * Adds new tween to composer
   * @param tween Tween to add
   */
  push = (tween: SimpleTween<T>):void => {
    if (!this.tweens.find((t) => {
      return t.tween === tween;
    })) {
      tween.onUpdate = this.onTweenUpdate;

      const loop = tween.setParentLoop();
      this.tweens.push({
        tween,
        loop
      });

      if (!this.value) {
        this.value = tween.from;
      }

      if (this.empty) {
        this.empty = false;
        this.loop();
      }
    }
  }

  /**
   * Removes tween from a composer
   * @param tween Tween to remove
   */
  remove = (tween: SimpleTween<T>):void => {
    this.tweens = this.tweens.filter((t) => {
      return t.tween !== tween;
    });
  }

  /**
   * Inner loop function. Serves as a master loop for all tweens
   */
  private loop = ():void => {
    if (this.killed || this.empty) return;

    const toRemove:Array<SimpleTween<T>> = [];

    if (this.value) {
      this.previousValue = copyValue<T>(this.value);
    }

    this.tweens.forEach((t) => {
      if (t.tween.killed) {
        toRemove.push(t.tween);
      } else {
        t.loop();
      }
    });

    toRemove.forEach((tween) => {
      this.remove(tween);
    });

    if (this.tweens.length === 0) {
      this.empty = true;
    }

    this.pendingTicks.forEach((tick) => {
      if (isNumbersArray(tick.delta) && isNumbersArray(this.value)) {
        (this.value as number[]) = addArrays(this.value, tick.delta);
      } else if (isNumbersObject(tick.delta) && isNumbersObject(this.value)) {
        (this.value as NumbersObject) = addObjects(this.value, tick.delta);
      } else if (typeof tick.delta === "number" && typeof this.value === "number") {
        (this.value as number) = this.value + tick.delta;
      } else {
        throw new Error(
          `unexpected value types for inputs: ${typeof tick.delta}, ${typeof this
            .value}`
        );
      }
    });

    if (!this.previousValue) {
      this.previousValue = copyValue<T>(this.value as T);
    }

    if (isNumbersArray(this.previousValue) && isNumbersArray(this.value)) {
      (this.delta as number[]) = subArrays(this.value, this.previousValue);
    } else if (isNumbersObject(this.previousValue) && isNumbersObject(this.value)) {
      (this.delta as NumbersObject) = subObjects(this.value, this.previousValue);
    } else if (typeof this.previousValue === "number" && typeof this.value === "number") {
      (this.delta as number) = (this.previousValue - this.value);
    } else {
      throw new Error(
        `unexpected value types for inputs: ${typeof this.previousValue}, ${typeof this
          .value}`
      );
    }

    this.onUpdate({
      value: this.value,
      delta: this.delta as T
    })

    if (!this.empty) {
      requestAnimationFrame(this.loop);
    }
  }

  /**
   * Callback for every tween
   * @param tick Value recieved from the tween
   */
  private onTweenUpdate = (tick:TweenStatus<T>):void => {
    this.pendingTicks.push(tick);
  }

  /**
   * Kills all tweens
   */
  kill = ():void => {
    this.killed = true;
  }
}
