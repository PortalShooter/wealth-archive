# useScrollTo

Прокручивает скролл на расстояние: до позиции, переданной в ```scrollToPosition()``` (в пикселях) или до элемента, переданного в метод ```scrollToElement()```.

### Пример

```tsx
const ExampleComponent = () => {
  const scrollTo = useScrollTo();
  const elementToScroll = useRef(null);

  return (
    <div>
      <button onClick={() => scrollTo.scrollToElement(elementToScroll)}>Scroll to bottom element</button>
      {/* Content */}
      <div ref={elementToScroll}>Bottom element</div>
      <button onClick={() => scrollTo.scrollToPosition(50)}>
        Scroll to position: 50px from top
      </button>
    </div>
  )
}
```

### API

```ts
export interface UseScrollTo {
  (): {
    /**
     * Scrolls to a specific position in pixels.
     */
    scrollToPosition: (position: number) => void;
    /**
     * Scrolls to a top position of an element (accepts React Ref). Use an empty absolutely positioned element if you need a specific offset from a section.
     */
    scrollToElement: (
      element: React.MutableRefObject<HTMLElement | null>
    ) => void;
  };
}
```
