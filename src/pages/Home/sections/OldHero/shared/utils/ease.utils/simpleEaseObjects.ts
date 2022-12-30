import { simpleEase } from "./simpleEase";
import { NumbersObject } from "../object.utils/types";

interface SimpleEaseObjects {
  (
    startValue: NumbersObject,
    endValue: NumbersObject,
    easeValue: number
  ): NumbersObject;
}

export const simpleEaseObjects: SimpleEaseObjects = (
  startValue,
  endValue,
  eaeaseValuese
) => {
  let result: NumbersObject = {};

  Object.keys(startValue).forEach((key) => {
    result[key] = simpleEase(startValue[key], endValue[key], eaeaseValuese);
  });

  return result;
};
