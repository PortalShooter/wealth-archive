# syncResize

Lets you to the window resize event end get it's data

### API

```ts
export interface SyncResize {
  /**
   * Subscribe to the window resize event
   */
  subscribe: (handler: Handler<ResizeEvent>) => void;
  /**
   * Unsubscribe from the window resize event
   */
  unsubscribe: (handler: Handler<ResizeEvent>) => void;
  /**
   * Get the window size
   */
  get: () => WindowSize;
}
```