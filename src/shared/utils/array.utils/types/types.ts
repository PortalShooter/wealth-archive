export const isNumbersArray = (p: any): p is number[] => {
  if (!Array.isArray(p)) return false;

  let result = true;
  p.forEach((val) => {
    if (typeof val !== "number") {
      result = false;
    }
  });

  return result;
};