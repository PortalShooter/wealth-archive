import { isNumbersObject, NumbersObject } from "../object.utils/types";
import { isNumbersArray } from "../array.utils/types";
import { simpleEase } from "./simpleEase";
import { simpleEaseArrays } from "./simpleEaseArrays";
import { simpleEaseObjects } from "./simpleEaseObjects";

const defaultOptions = {
  power: 2,
  ease: 6,
};

interface PowerEaseConstructor {
  power?: number;
  ease?: number;
}

export interface PowerEase<T> {
  ease: (newValue: T) => T | undefined;
  setProps: (options: PowerEaseConstructor) => void;
}

export class PowerEase<T extends number | number[] | NumbersObject>
  implements PowerEase<T>
{
  private power;
  private easeValue;
  private buffer: Array<T> = [];
  private previuosEaseData: T | undefined;

  constructor({
    power = defaultOptions.power,
    ease = defaultOptions.ease,
  }: PowerEaseConstructor) {
    this.power = power;
    this.easeValue = ease;
  }

  private cloneValue = (value: T): T => {
    if (isNumbersArray(value)) {
      return value.slice() as T;
    } else if (typeof value === "number") {
      return value;
    } else if (isNumbersObject(value)) {
      return Object.assign({}, value);
    } else {
      throw new Error("unsupported value type");
    }
  };

  ease = (newValue: T) => {
    let prevValue: T;

    if (newValue === undefined && this.previuosEaseData !== undefined) {
      newValue = this.cloneValue(this.previuosEaseData) as T;
    } else if (newValue) {
      this.previuosEaseData = this.cloneValue(newValue) as T;
    }

    for (var i = 0; i < this.power; i++) {
      if (this.buffer[i] === undefined) {
        this.buffer[i] = this.cloneValue(newValue);
      } else {
        if (i === 0) {
          prevValue = this.cloneValue(newValue);
        } else {
          prevValue = this.cloneValue(this.buffer[i - 1]);
        }

        const currentBuffer = this.buffer[i];
        if (isNumbersArray(prevValue) && isNumbersArray(currentBuffer)) {
          this.buffer[i] = simpleEaseArrays(
            currentBuffer,
            prevValue,
            this.easeValue
          ) as T;
        } else if (
          typeof currentBuffer === "number" &&
          typeof prevValue === "number"
        ) {
          this.buffer[i] = simpleEase(
            currentBuffer,
            prevValue,
            this.easeValue
          ) as T;
        } else if (
          isNumbersObject(currentBuffer) &&
          isNumbersObject(prevValue)
        ) {
          this.buffer[i] = simpleEaseObjects(
            currentBuffer,
            prevValue,
            this.easeValue
          ) as T;
        } else {
          throw new Error("unsupported value type");
        }
      }

      if (i === this.power - 1) {
        return this.buffer[i];
      }
    }
  };

  setProps = ({ power, ease }: PowerEaseConstructor) => {
    if (typeof power !== "undefined") {
      this.power = power;
    }
    if (typeof ease !== "undefined") {
      this.easeValue = ease;
    }
  };
}
