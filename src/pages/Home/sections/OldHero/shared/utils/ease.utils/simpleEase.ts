interface SimpleEase {
  (startValue: number, endValue: number, easeValue: number): number;
}

export const simpleEase: SimpleEase = (startValue, endValue, easeValue) => {
  return startValue + (endValue - startValue) / easeValue;
};
