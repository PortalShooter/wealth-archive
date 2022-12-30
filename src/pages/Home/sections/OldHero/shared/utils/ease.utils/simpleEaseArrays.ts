import { simpleEase } from "./simpleEase";

interface SimpleEaseArrays {
  (startValue: number[], endValue: number[], easeValue: number): number[];
}

export const simpleEaseArrays: SimpleEaseArrays = (
  startValue,
  endValue,
  easeValue
) => {
  return startValue.map(function (v, valIndex) {
    return simpleEase(v, endValue[valIndex], easeValue);
  });
};
