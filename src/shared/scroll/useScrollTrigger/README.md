# useScrollTrigger

Эта утилита позволяет получить значение true/false при прокрутке пользователем определенного элемента на экране (или со смещением, если переданы параметры в triggerOptions).

### Пример

```tsx
// Add useScrollTrigger
import { useScrollTrigger } from "@/shared/scroll";

// Create reference to an element
const Text = useRef(null);
// Pass Ref of element to useScrollTrigger with optional offset parameters
// useScrollTrigger returns type boolean
const TextTriggered = useScrollTrigger(Text, {
  offset: [-100, -100],
  units: ["vh", "px"],
});

// Then you can do something in your component, when scroolTrigger will return true/false
console.log(TextTriggered);

return (
  <body>
    <div style={{minHeight: "1000px"}}>Some components...</div>
    <div ref={Text}>Target element to scroll trigger</div>
  </body>
)
```


### API

```ts
interface UseScrollTrigger {
  (
    ref: React.MutableRefObject<HTMLElement | null>,
    triggerOptions?: {
      /**
       * Offset for the trigger position. Array can be used for complex calculations. Example: top: [100, -50], units: ["%", "px"] - 50px from the bottom of the section.
       */
      offset?: number | number[];
      /**
       * Units in which shift is calculated ("px", "%", "vh"). Array has to be used if "top" is also an Array.
       */
      units?: OffsetUnits | OffsetUnits[];
      /**
       * If the trigger should work only once
       */
      mode?: "once" | "always";
    }
  ): boolean;
}
```