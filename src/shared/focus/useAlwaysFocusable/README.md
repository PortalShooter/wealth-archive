# useAlwaysFocusable

Sets element to be focusable even if focus lock was engaged

### Пример

```tsx
import { useAlwaysFocusable } from "@/shared/focus";

const ButtonExample = (args) => {
  const buttonRef = useRef(null)
  useAlwaysFocusable(buttonRef);


  // This button will always available for focusing
  return (
    <button ref={buttonRef}>Super Button</button>
  )
}
```

### API

```tsx
interface AlwaysFocusableData {
  get: () => typeof refs;
}

interface UseAlwaysFocusable {
  (ref?: React.MutableRefObject<HTMLElement | null>): AlwaysFocusableData;
}

```