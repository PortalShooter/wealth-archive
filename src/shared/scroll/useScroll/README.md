# useScroll

Возвращает текущее положение прокрутки окна.
Возвращает верхнее и левое значения прокрутки.

### Пример 

```tsx
  import { useScroll } from "@/shared/scroll";
  
  const scroll = useScroll();

  console.log(scroll.top);
  console.log(scroll.left);
```

### API

```ts
  interface ScrollPosition {
    top: number;
    left: number;
  };

  interface ScrollData extends ScrollPosition {
    get: () => ScrollPosition
  }
```

