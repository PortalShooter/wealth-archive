# CompositeAnimation


Сохраняет значения opacity и transform из разных источников, объединяет их и применяет к элементу.

### API
```ts

export interface CompositeAnimation {
  /**
   * Set values of opacity & transform. Use unique id for each script that uses this composite value
   */
  set: (id: string, props: CompositeAnimationProperties) => void;
  /**
   * Gets composited values of opacity & transform
   */
  getRaw: (ids?: string[]) => {
    transform: StrictTransformObject;
    opacity: number;
  };
  /**
   * Gets opacity & CSS string for transform
   */
  getCSS: () => {
    opacity: string;
    transform: string;
  };
}

```