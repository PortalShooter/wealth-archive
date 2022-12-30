# useElementResize

Called when element is resized. Checks new size every time the window is resized. It will not fire if window size stays the same.

### Example

```tsx
import { useElementResize } from "@/shared/resize";

const ComponentExample = (args) => {
  const elementRef = useRef(null)
  const elementSize = useElementResize(elementRef.current);

  if (elementSize.width > 1200 && elementSize.height > 500) {
    // Do something great, because the element size is big enough!
  };

  return (
    <div>
      <div ref={elementRef}>
        Hello useElementResize!
      </div>
    </div>
  )
}
```

### API

```ts
interface ElementSize {
  width: number;
  height: number;
};

interface Resize extends ElementSize {
  get: () => ElementSize
};

interface UseElementResize {
  (element: HTMLElement | null): Resize;
}
```