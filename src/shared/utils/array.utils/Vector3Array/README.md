# Vector3Array


### API
```ts
import { Vector3Array } from "@/shared/utils/array.utils";

export interface Vector3Array {
  elements: Array<Element>;
  push(element: Element): void;
  remove(element: Element): void;
  set(element: Element): void;
  get(element: ElementName | undefined): Vector3 | undefined;
  forEach(callbackfn: (value: Element, index: number, array: any[]) => void): void;
  sum(): Vector3;
  multiply(): Vector3;
}
```