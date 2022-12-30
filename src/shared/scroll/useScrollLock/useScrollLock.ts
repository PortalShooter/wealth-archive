import React, {
  useRef,
  useCallback,
  useMemo,
  useEffect,
  useState,
} from "react";
import { syncScroll } from "..";
import { EventEmitter } from "../../utils/EventEmitter";

// TODO: SetBodyScroll - animated scroll when body is locked
interface ScrollLockEvent {
  type: "scroll:lock" | "scroll:unlock";
  payload: {
    key: string;
  };
}

const scrollLockEventEmitter = new EventEmitter<ScrollLockEvent>();

interface UseScrollLock {
  (): {
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
     * Scrollbar offset value (just set it to styles.right).
     */
    offset: number;
    /**
     * Is scroll lock active.
     */
    locked: boolean;
  };
}

/**
 * Global state
 */
export const scrollLockGlobalState = {
  /**
   * if body scroll was
   */
  bodyLocked: false,
  /**
   * How much the size of the body was changed.
   */
  bodyMargin: 0,
};

/**
 * Array of locks. Used to have multiple possible locks (preloader, modal etc)
 */
let locks: string[] = [];

/**
 * How much body was shifted vertically to mimic the scroll position. We store it globally since any hook call can unlock the body and this value is needed to set the correct scroll position.
 */
let bodyScrolled = 0;

/**
 * Exported controller to use with non-react components
 */
export const scrollLockController = {
  /**
   * Locks the scroll.
   * @param key unique key for the component calling this function
   */
  lock: (key: string) => {
    if (!locks.includes(key)) {
      locks.push(key);
    }

    if (locks.length > 0 && !scrollLockGlobalState.bodyLocked) {
      scrollLockGlobalState.bodyLocked = true;

      const body = document.body;
      const previousBodySize = body.clientWidth;

      body.style.position = "fixed";
      body.style.overflow = "hidden";
      body.style.left = "0px";
      body.style.right = "0px";

      const scrolled = syncScroll.get().top;
      bodyScrolled = scrolled;
      body.style.top = -scrolled + "px";

      if (typeof window !== "undefined") {
        syncScroll.setContainer({
          element: window,
          locked: true,
        });
      }

      window.scrollTo(0, 0);

      document.body.style.right = "0px";

      scrollLockGlobalState.bodyMargin = body.clientWidth - previousBodySize;
      body.style.right = `${Math.max(0, scrollLockGlobalState.bodyMargin)}px`;

      scrollLockEventEmitter.dispatch({
        type: "scroll:lock",
        payload: {
          key,
        },
      });
    }
  },

  /**
   * Unlocks the scroll.
   * @param key unique key for the component calling this function
   */
  unlock: (key: string) => {
    if (locks.includes(key)) {
      locks = locks.filter((k) => k !== key);
    }

    if (locks.length === 0 && scrollLockGlobalState.bodyLocked) {
      scrollLockGlobalState.bodyLocked = false;

      const body = document.body;
      body.style.position = "";
      body.style.overflow = "";
      body.style.left = "";
      body.style.right = "";
      body.style.top = "";

      scrollLockGlobalState.bodyMargin = 0;
      window.scrollTo(0, bodyScrolled);

      if (typeof window !== "undefined") {
        syncScroll.setContainer({
          element: window,
          locked: false,
        });
      }

      scrollLockEventEmitter.dispatch({
        type: "scroll:unlock",
        payload: {
          key,
        },
      });
    }
  },
};

/**
 * Provides methods to disable scrolling, automaticly works with body and returns body offset value in other cases so it can be used with fixed elements
 * To check if body is locked please use the scroll store.
 * @param element Use global wrapper (document.body, probably) to initialize scroll locking or leave it empty
 * @returns Methods and current body offset
 */
export const useScrollLock: UseScrollLock = () => {
  const [bodyLockedState, setBodyLockedState] = useState(false);

  // const scrollLockState = !!useSelector((state: RootState) =>
  //   state.scroll ? state.scroll.locked : undefined
  // );
  const elementScrollbarFixed = useRef(false);

  /**
   * Disable Scroll
   */
  const lockScroll = useCallback((key: string) => {
    scrollLockController.lock(key);
  }, []);

  /**
   * Enable Scroll
   */
  const unlockScroll = useCallback((key: string) => {
    scrollLockController.unlock(key);
  }, []);

  const handleEventEmitter = useCallback(() => {
    /**
     * Checks scrollbar offset for the handled element
     */

    if (scrollLockGlobalState.bodyLocked && !elementScrollbarFixed.current) {
      elementScrollbarFixed.current = true;
    } else if (
      !scrollLockGlobalState.bodyLocked &&
      elementScrollbarFixed.current
    ) {
      elementScrollbarFixed.current = false;
    }

    setBodyLockedState(scrollLockGlobalState.bodyLocked);
  }, []);

  useEffect(() => {
    scrollLockEventEmitter.subscribe(handleEventEmitter);
    return () => {
      scrollLockEventEmitter.unsubscribe(handleEventEmitter);
    };
  }, []);

  return useMemo(() => {
    return {
      lockScroll,
      unlockScroll,
      locked: bodyLockedState,
      offset: scrollLockGlobalState.bodyMargin,
    };
  }, [lockScroll, unlockScroll, scrollLockGlobalState.bodyMargin, bodyLockedState]);
};
