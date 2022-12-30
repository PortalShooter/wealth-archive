import {
  CSSProperties,
  MutableRefObject,
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { getFocusable } from "../utils/dom.utils";
import { animationList, Animation, AnimationOptions } from "./animations";

export interface DropDown {
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

export const DropDown: DropDown = ({
  button,
  children,
  className,
  hover = false,
  closeOnDocumentClick = true,
  activeClassName = "active",
  style,
  disabled = false,
  opened = false,
  openDuration = 0.6,
  closeDuration = 0.7,
  maxHeight = Infinity,
  wrapperClassName,
  animation = animationList.Default,
  dispatchResize = false,
}) => {
  const [openedState, setOpenedState] = useState<boolean>(opened);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const outerWrapper = useRef<HTMLDivElement>(null);
  const innerWrapper = useRef<HTMLDivElement>(null);
  const disabledElementsRef = useRef<HTMLElement[]>([]);

  const buttonFocusedRef: MutableRefObject<boolean> = useRef(false);
  const initialAnimation: MutableRefObject<boolean | null> = useRef(false);
  const openedRef: MutableRefObject<boolean | null> = useRef(opened);
  const animationModule: MutableRefObject<Animation | null> = useRef(null);

  const open = useCallback((openOptions: { duration: number }) => {
    if (!innerWrapper.current) {
      return;
    }

    disabledElementsRef.current.forEach((element) => {
      element.setAttribute("tabindex", "0");
    });

    disabledElementsRef.current = [];

    animationModule.current?.open({
      duration: openOptions.duration,
    });
  }, []);

  const close = useCallback((closeOptions: { duration: number }) => {
    if (!innerWrapper.current) {
      return;
    }

    const focusableElements = getFocusable(innerWrapper.current);

    focusableElements.forEach((element) => {
      disabledElementsRef.current.push(element);
      element.setAttribute("tabindex", "-1");
    });

    animationModule.current?.close({
      duration: closeOptions.duration,
    });
  }, []);

  const handleClick = useCallback(() => {
    if (hover) {
      return;
    }

    openedRef.current = !openedRef.current;
    setOpenedState(openedRef.current);
  }, [hover]);

  const handleDocumentClick = useCallback(
    (e: MouseEvent) => {
      if (!closeOnDocumentClick || !container.current) return;

      if (
        (e.target &&
          e.target instanceof Element &&
          container.current.contains(e.target)) ||
        container.current === e.target
      ) {
        return;
      }

      openedRef.current = false;
      setOpenedState(openedRef.current);
    },
    [closeOnDocumentClick]
  );

  useEffect(() => {
    if (openedState) {
      document.addEventListener("click", handleDocumentClick);
    } else {
      document.removeEventListener("click", handleDocumentClick);
    }

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [openedState, handleDocumentClick]);

  const handleFocus = useCallback(() => {
    buttonFocusedRef.current = true;
  }, []);

  const handleBlur = useCallback(() => {
    buttonFocusedRef.current = false;
  }, []);

  const handleKeyboard = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        if (!openedRef.current) return;

        setTimeout(() => {
          let activeElement = document.activeElement;
          if (container.current && !container.current.contains(activeElement)) {
            openedRef.current = false;
            setOpenedState(openedRef.current);
          }
        }, 0);
      } else if (e.key === "Enter") {
        if (!hover || !buttonFocusedRef.current) {
          return;
        }

        openedRef.current = !openedRef.current;
        setOpenedState(openedRef.current);
      }
    },
    [hover]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyboard);

    return () => {
      document.removeEventListener("keydown", handleKeyboard);
    };
  }, [handleKeyboard]);

  const handleMouseenter = useCallback(() => {
    if (hover && !openedRef.current) {
      openedRef.current = true;
      setOpenedState(openedRef.current);
    }
  }, [hover]);

  const handleMouseleave = useCallback(() => {
    if (hover && openedRef.current) {
      openedRef.current = false;
      setOpenedState(openedRef.current);
    }
  }, [hover]);

  useEffect(() => {
    initialAnimation.current = true;

    animationModule.current = new animation({
      innerWrapper: innerWrapper,
      outerWrapper: outerWrapper,
      maxHeight: maxHeight,
      dispatchResize,
    });

    return () => {
      if (animationModule.current) {
        animationModule.current.destroy();
      }
    };
  }, [animation, maxHeight, dispatchResize]);

  useEffect(() => {
    if (openedState) {
      open({
        duration: initialAnimation ? openDuration : 0,
      });
    } else {
      close({
        duration: initialAnimation ? closeDuration : 0,
      });
    }

    initialAnimation.current = false;
  }, [openedState, open, close, openDuration, closeDuration]);

  const clonedButton = disabled ? (
    <button.type ref={buttonRef} {...button.props}>
      {button.props.children}
    </button.type>
  ) : (
    <button.type
      ref={buttonRef}
      {...button.props}
      onClick={handleClick}
      onFocus={handleFocus}
      onBlur={handleBlur}
      aria-haspopup="true"
      aria-expanded={openedState ? "true" : "false"}
    >
      {button.props.children}
    </button.type>
  );

  let classNames = [];

  if (className) {
    classNames.push(className);
  }

  if (openedState) {
    classNames.push(activeClassName);
  }

  return (
    <div
      onMouseEnter={handleMouseenter}
      onMouseLeave={handleMouseleave}
      ref={container}
      className={classNames.join(" ")}
      style={style}
    >
      {clonedButton}
      <div
        ref={outerWrapper}
        className={wrapperClassName}
        style={{
          position: "relative",
        }}
      >
        <div ref={innerWrapper}>{children}</div>
      </div>
    </div>
  );
};
