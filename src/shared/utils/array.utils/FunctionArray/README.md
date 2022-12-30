# FunctionArray

### API

```ts
import { FunctionArray } from "@/shared/utils/array.utils";

export interface FunctionArray {
  forEach: (func: (innerFunction: () => unknown) => void) => void;
  reduce: (func: (previousValue: () => unknown, currentValue: () => unknown, currentIndex: number, array: (() => unknown)[]) => () => unknown) => unknown;
  map: (func: (innerFunction: () => unknown) => unknown) => Array<unknown>;
  push: (innerFunction: () => unknown) => void;
  remove: (innerFunction: () => unknown) => void;
  boolReduce: () => boolean;
}
```