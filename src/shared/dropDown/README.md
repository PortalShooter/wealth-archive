# DropDown

Выпадающий список.

### Пример

```tsx
import { DropDown } from "@/shared/dropDown";

const Component = () => {
  return (
    <DropDown
      button={
        <button style={{ marginBottom: "20px", padding: "10px 30px" }}>
          Dropdown
        </button>
      }
      className={styles.DropDown}
      closeOnDocumentClick={true}
      activeClassName={styles.DropDown_Active}
    >
      <div>item 1</div>
      <div>item 2</div>
      <div>item 3</div>
      <div>item 4</div> 
    </DropDown>
  )
}
```

### API

```tsx
interface DropDown {
  (props: {
    /**
     * Button element. You can use jsx to put it there
     */
    button: ReactElement<HTMLButtonElement>;
    /**
     * The DropDown can be opened on user click or mouseenter
     */
    hover?: boolean;
    /**
     * If the DropDown should be closed when user clicks outside of it
     */
    closeOnDocumentClick?: boolean;
    /**
     * The className that will be added when the DropDown is opened
     */
    activeClassName?: string;
    /**
     * If the dropdown shoul be disabled
     */
    disabled?: boolean;
    /**
     * If the dropdown is opened by default
     */
    opened?: boolean;
    /**
     * The duration of the animation when the DropDown is opened
     */
    openDuration?: number;
    /**
     * The duration of the animation when the DropDown is closed
     */
    closeDuration?: number;
    /**
     * The maximum height of the DropDown. A scrollbar will be added in the case of overflow
     */
    maxHeight?: number;
    /**
     * Classname of the wrapper element
     */
    wrapperClassName?: string;
    /**
     * The animation class. The DropDown will open with a sliding down animation by default
     */
    animation?: new (
      ...args: [animationOptions: AnimationOptions]
    ) => Animation;
    /**
     * Resize event will be dispatched to the syncResize object, so all the scroll animations could recalculate their positions
     */
    dispatchResize?: boolean;
    children?: ReactElement | ReactElement[];
    className?: string;
    style?: CSSProperties;
  }): ReactElement | null;
}
```