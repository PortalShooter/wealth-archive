# useResize

Возвращает размер документа (viewport): width, height и get().width и get().height


### Пример

```tsx
import { useResize } from "@/shared/resize";

const ComponentExample = () => {
  const size = useResize();

  return (
      <div>
        {size.width > 720 && <h2>Title for tablet & desktop viewport size</h2> }
        {size.width < 720 && <h2>Title for mobile viewport size</h2> }
      </div>
  )
}
```

### API

```ts
export interface ElementSize {
  width: number;
  height: number;
};

export interface Resize extends ElementSize {
  get: () => ElementSize
};
```