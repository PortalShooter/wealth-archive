# syncScroll

Вы можете подписаться / отказаться от подписки на события прокрутки и получать их данные.


### API

```ts
interface SyncScroll {
  /**
   * Subscribe to scroll event
   */
  subscribe: (handler: Handler<ScrollEvent>) => void;
  /**
   * Unsubscribe from scroll event
   */
  unsubscribe: (handler: Handler<ScrollEvent>) => void;
  /**
   * Get window scroll data
   */
  get: () => {
    readonly locked: boolean;
    readonly synthetic: boolean;
    readonly mode: ScrollModes;
    readonly left: number;
    readonly top: number;
    readonly rawLeft: number;
    readonly rawTop: number;
  };
  /**
   * Get scroll data by element
   */
  getContainer: (element: WatchedElement) => {
    readonly locked: boolean;
    readonly synthetic: boolean;
    readonly mode: ScrollModes;
    readonly left: number;
    readonly top: number;
    readonly rawLeft: number;
    readonly rawTop: number;
  };
  /**
   * Add new tracked element
   */
  addContainer: (containerOptions: {
    mode?: ScrollModes;
    element: WatchedElement;
  }) => void;
  /**
   * Set any options to container (locked, synthetic or mode)
   */
  setContainer: (containerOptions: {
    mode: ScrollModes;
    synthetic: boolean;
    locked: boolean;
    element: WatchedElement;
  }) => void;
}

```