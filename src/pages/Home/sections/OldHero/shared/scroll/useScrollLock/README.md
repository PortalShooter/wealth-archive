# useScrollLock

Предоставляет методы для отключения прокрутки, автоматически работает с body и возвращает offset значения body в других случаях, чтобы его можно было использовать с фиксированными элементами.

Принимает необязательный аргумент  - element. Используйте глобальный враппер (document.body, например), чтобы инициализировать отслеживание скролла, или оставьте его пустым.

Возвращает методы lockScroll, unlockScroll, setBodyScroll и текущие отступы body.

### API

```ts
interface UseScrollLock {
  (element?: HTMLElement | null): {
    /**
     * Locks the scroll.
     * @param key unique key for the component calling this function 
     */
    lockScroll: (key: string) => void;
    /**
     * Unlocks the scroll.
     * @param key unique key for the component calling this function 
     */
    unlockScroll: (key: string) => void;
    /**
     * Used to force the body top offset (in case you need a scroll animation when the scroll is locked).
     */
    setBodyScroll: (position: number) => void;
    /**
     * Scrollbar offset value (just set it to styles.right).
     */
    offset: number;
    /**
     * Is scrroll lock active.
     */
    locked: boolean;
  };
}
```