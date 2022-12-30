/**
 * Deep copy.
 * @param T Generic type of target/copied value.
 * @param original original value to be copied.
 */

export const deepCopy = <T>(original: T): T => {
  if (original === null) {
    return original;
  }

  if (original instanceof Date) {
    return new Date(original.getTime()) as any;
  }

  if (original instanceof Array) {
    const cp = [] as any[];

    (original as any[]).forEach((v) => {
      cp.push(v);
    });

    return cp.map((n: any) => deepCopy<any>(n)) as any;
  }

  if (typeof original === "object" && original !== {}) {
    const cp = { ...(original as { [key: string]: any }) } as {
      [key: string]: any;
    };
  
    Object.keys(cp).forEach((k) => {
      cp[k] = deepCopy<any>(cp[k]);
    });

    return cp as T;
  }

  return original;
};
