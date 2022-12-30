export interface FunctionArray {
  forEach: (func: (innerFunction: () => unknown) => void) => void;
  reduce: (func: (previousValue: () => unknown, currentValue: () => unknown, currentIndex: number, array: (() => unknown)[]) => () => unknown) => unknown;
  map: (func: (innerFunction: () => unknown) => unknown) => Array<unknown>;
  push: (innerFunction: () => unknown) => void;
  remove: (innerFunction: () => unknown) => void;
  boolReduce: () => boolean;
}

export class FunctionArray {
  private elements: Array<() => unknown> = [];

  constructor() {}

  forEach = (func: (innerFunction: () => unknown) => void) => {
    this.elements.forEach(func);
  }

  reduce = (func: (previousValue: () => unknown, currentValue: () => unknown, currentIndex: number, array: (() => unknown)[]) => () => unknown): unknown => {
    return this.elements.reduce(func);
  }

  map = (func: (innerFunction: () => unknown) => unknown) => {
    return this.elements.map(func);
  }

  push = (innerFunction: () => unknown) => {
    this.elements.push(innerFunction);
  }

  remove = (innerFunction: () => unknown) => {
		this.elements = this.elements.filter(function(el) {
			return el !== innerFunction;
		});
  }

  boolReduce = (): boolean => {
		return this.elements.reduce((prev: boolean, flag: () => unknown) => {
			return prev && !!flag();
		}, true);
	}
}