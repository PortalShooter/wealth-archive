// push({name: 'name', value: 1})
// remove({name: 'name'})
// set({name: 'name', value: 1})

interface Vector3 {
  x: number;
  y: number;
  z: number;
}

interface Element {
  name: string;
  value: Vector3;
}

interface ElementName {
  name: string;
}

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

export class Vector3Array {
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

  get = (element: ElementName | undefined): Vector3 | undefined => {
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

  sum = (): Vector3 => {
    return this.elements
      .map((el) => {
        return el.value;
      })
      .reduce((total, value) => {
        return {
          x: total.x + value.x,
          y: total.y + value.y,
          z: total.z + value.z, 
        }
      }, {x: 0, y: 0, z: 0});
  };

  multiply = (): Vector3 => {
    return this.elements
      .map(function (val) {
        return val.value;
      })
      .reduce((total, value) => {
        return {
          x: total.x * value.x,
          y: total.y * value.y,
          z: total.z * value.z, 
        }
      }, {x: 0, y: 0, z: 0});
  }
}
