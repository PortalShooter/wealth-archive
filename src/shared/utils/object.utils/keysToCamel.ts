import { DefaultObject } from "./";

type SnakeToCamelCase<S extends string> = S extends `${infer T}_${infer U}`
  ? `${Lowercase<T>}${Capitalize<SnakeToCamelCase<U>>}`
  : S;

type SnakeToCamelCaseNested<T> = T extends object
  ? {
      [K in keyof T as SnakeToCamelCase<K & string>]: SnakeToCamelCaseNested<
        T[K]
      >;
    }
  : T;

export const keysToCamel = <T extends object, K extends keyof object>(
  obj: T
): SnakeToCamelCaseNested<T> => {
  if (isObject(obj)) {
    const newObj: DefaultObject = {};

    Object.keys(obj).forEach((key) => {
      newObj[snakeToCamel(key.toString())] = keysToCamel(obj[key as K]);
    });

    return newObj as SnakeToCamelCaseNested<T>;
  }

  if (Array.isArray(obj)) {
    return obj.map((i) => {
      return keysToCamel(i);
    }) as SnakeToCamelCaseNested<T>;
  }

  return obj as SnakeToCamelCaseNested<T>;
};

const snakeToCamel = (str: string): SnakeToCamelCase<string> =>
  str
    .toLowerCase()
    .replace(/([-_][a-z])/g, (group) =>
      group.toUpperCase().replace("-", "").replace("_", "")
    );

const isObject = <T extends object>(obj: T) =>
  obj === Object(obj) && !Array.isArray(obj) && typeof obj !== "function";
