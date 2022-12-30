# ValueArray


### API
```ts
import { ValueArray } from "@/shared/utils/array.utils";

export interface ValueArray {
  elements: Array<Element>;
  push(element: Element): void;
  remove(element: Element): void;
  set(element: Element): void;
  get(element: ElementName | undefined): number | undefined;
  forEach(callbackfn: (value: Element, index: number, array: any[]) => void): void;
  sum(): number;
  multiply(): number;
}
```