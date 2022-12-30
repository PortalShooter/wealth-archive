# getElementOffset

Возвращает top и left передаваемого элемента. Вторым необязательным аргументом принимает элемент-родитель, до которого нужно посчитать top или left. 

### Пример

```tsx
import { getElementOffset } from "@/shared/utils/dom.utils";

const ComponentExample = () => {
  const HeaderRef = useRef(null);
  const HeaderOffsetTop = getElementOffset(HeaderRef.current).top;
  
  return (
    <header ref={HeaderRef}>Header</header>
  )
}
```
