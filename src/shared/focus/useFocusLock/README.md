# useFocusLock

Ограничивает возможость фокуса (переключение tab-ом) детьми переданного элемента.

### Пример

```tsx
import { useFocusLock } from "@/shared/focus";

const ModalExample = (args) => {
  const ModalRef = useRef(null);
  const ModalLockHook = useFocusLock(ButtonRef);

  const lockFocus = ModalLockHook.lock;
  const unlockFocus = ModalLockHook.unlock;

  // When ModalLockHook.locked is true
  // Focus elements will available only in the modal element
  console.log(ModalLockHook.locked)

  return (
    <div>
      <button onClick={() => {lockFocus()}}>Lock Focus</button>
      <button onClick={() => {unlockFocus()}}>Unlock Focus</button>
      
      <div ref={ModalRef}>
        <h2>Modal window</h2>
        <button>button 1</button>
        <button>button 2</button>
      </div>
    </div>
  )
}
```

### API

```tsx
interface UseFocusLockData {
  lock: VoidFunction
  unlock: VoidFunction
  locked: boolean
}

interface UseFocusLock {
  (element?: React.MutableRefObject<HTMLElement | null>): UseFocusLockData
}
```