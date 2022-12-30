# getFocusable

Возвращает массив всех элементов доступных для фокуса, в пределах передаваемого элемента. 

Если элемент не передан, то в пределах документа.

Вторым атрибутом позволяет учитывать или нет атрибут tabindex равный -1. По умолчанию, не включает их в возвращаемый массив элементов.

### Пример 

```tsx
import { getFocusable } from "@/shared/utils/dom.utils";

const ComponentExample = () => {
  const wrapperRef = useRef(null);
  const focusable = getFocusable(wrapperRef.current);
  const focusableWithTabIndex = getFocusable(wrapperRef.current, true);

  console.log(focusable) // (2) [button, button]
  console.log(focusableWithTabIndex) // (3) [button, button, button]
  
  return (
    <div ref={wrapperRef}>
      <button>Button 1</button>
      <button>Button 2</button>
      <button tabIndex={-1}>Button 3</button>
    </div>
  )
}
```

### API

```ts
export const getFocusable = (element?: HTMLElement, anyTabIndex?: boolean):Array<HTMLElement> => {
  // ...
}
```