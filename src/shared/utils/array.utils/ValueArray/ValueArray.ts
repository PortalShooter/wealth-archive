// push({name: 'name', value: 1})
// remove({name: 'name'})
// set({name: 'name', value: 1})

interface Element {
  name: string;
  value: number;
}

interface ElementName {
  name: string;
}

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

export class ValueArray {
  constructor() {
    this.elements = [];
  }

  forEach = (callbackfn: (value: Element, index: number, array: any[]) => void) => {
    return this.elements.forEach(callbackfn);
  };

  push = (element: Element): void => {
    if (
      this.elements.find(function (el) {
        return el.name === element.name;
      })
    ) {
      throw new Error(`Element with name ${element.name} already exists`);
    }

    this.elements.push(element);
  };

  remove = (element: Element): void => {
    this.elements = this.elements.filter(function (el) {
      return el.name !== element.name;
    });
  };

  set = (element: Element): void => {
    let el = this.elements.find((el) => {
      return el.name === element.name;
    });
    if (el) {
      el.value = element.value;
    }
  };

  get = (element: ElementName | undefined): number | undefined => {
    if (!element) {
      return this.sum();
    } else {
      let found = this.elements.find((el) => {
        return el.name === element.name;
      });

      if (found) {
        return found.value;
      } else {
        return;
      }
    }
  };

  sum = (): number => {
    return this.elements
      .map((el) => {
        return el.value;
      })
      .reduce((total, value) => {
        return total + value;
      }, 0);
  };

  multiply = (): number => {
    return this.elements
      .map(function (val) {
        return val.value;
      })
      .reduce(function (total, value) {
        return total * value;
      }, 1);
  }
}