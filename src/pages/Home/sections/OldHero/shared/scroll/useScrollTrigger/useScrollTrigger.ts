import { useCallback, useEffect, useRef, useState } from "react";
import { syncScroll } from "../syncScroll";
import { syncResize } from "../../resize/syncResize";
import { getElementOffset } from "../../utils/dom.utils";

type OffsetUnits = "px" | "%" | "vh";

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

interface WatchedRef {
  ref: React.MutableRefObject<HTMLElement | null>;
  offset: number | undefined;
  height: number | undefined;
  resizeHandler: VoidFunction;
}

let watchedRefs: WatchedRef[] = [];

/**
 * This hook will return "true" and set the specified className of an element when user scrolls to the element
 * @param ref Reference object to the triggered element
 * @param triggerOptions Options object
 * @returns Boolean value that represents if the element was triggered
 */
export const useScrollTrigger: UseScrollTrigger = (ref, triggerOptions) => {
  const [triggered, setTriggered] = useState(false);
  const triggeredRef = useRef(false);

  triggerOptions = {
    offset: -100,
    units: "vh",
    mode: "once",
    ...triggerOptions,
  };

  const handleScroll = useCallback(() => {
    if (
      watchedWrapper.current.offset === undefined ||
      watchedWrapper.current.height === undefined
    ) {
      return;
    }

    if (triggeredRef.current && triggerOptions?.mode === "once") {
      return;
    }

    const scrollPosition = syncScroll.get().top;

    let triggerShift = 0;

    if (triggerOptions) {
      if (Array.isArray(triggerOptions.offset)) {
        if (
          !Array.isArray(triggerOptions.units) ||
          triggerOptions.units.length !== triggerOptions.offset.length
        ) {
          throw new Error(
            'If "offset" property is an array, "units" has to be an array with the same length.'
          );
        }

        for (let i = 0; i < triggerOptions.offset.length; i++) {
          if (triggerOptions.units[i] === "px") {
            triggerShift += triggerOptions.offset[i];
          } else if (triggerOptions.units[i] === "vh") {
            triggerShift +=
              (triggerOptions.offset[i] * syncResize.get().height) / 100;
          } else if (triggerOptions.units[i] === "%") {
            triggerShift +=
              (triggerOptions.offset[i] * watchedWrapper.current.height) / 100;
          }
        }
      } else {
        if (!triggerOptions.offset) {
          triggerShift = 0;
        } else if (triggerOptions.units === "px") {
          triggerShift = triggerOptions.offset;
        } else if (triggerOptions.units === "vh") {
          triggerShift =
            (triggerOptions.offset * syncResize.get().height) / 100;
        } else if (triggerOptions.units === "%") {
          triggerShift =
            (triggerOptions.offset * watchedWrapper.current.height) / 100;
        }
      }
    }

    const triggerPosition = watchedWrapper.current.offset + triggerShift;

    if (!triggeredRef.current && scrollPosition > triggerPosition) {
      triggeredRef.current = true;
      setTriggered(true);
    } else if (triggeredRef.current && scrollPosition <= triggerPosition) {
      triggeredRef.current = false;
      setTriggered(false);
    }
  }, [triggerOptions]);

  const handleResize = useCallback(() => {
    setTimeout(() => {
      if (triggeredRef.current && triggerOptions?.mode === "once") {
        return;
      }
  
      if (watchedWrapper.current.ref.current) {
        watchedWrapper.current.offset = getElementOffset(
          watchedWrapper.current.ref.current
        ).top;
  
        watchedWrapper.current.height =
          watchedWrapper.current.ref.current.clientHeight;
      }

      handleScroll();
    }, 0);
  }, [triggerOptions?.mode]);

  const watchedWrapper = useRef<WatchedRef>({
    ref: ref,
    height: undefined,
    offset: undefined,
    resizeHandler: handleResize,
  });

  useEffect(() => {
    const foundWrapper = watchedRefs.find((r) => r.ref === ref);
  
    if (foundWrapper) {
      watchedWrapper.current = foundWrapper;
    } else {
      watchedRefs.push(watchedWrapper.current);
      syncResize.subscribe(watchedWrapper.current.resizeHandler);  
    }

    syncResize.subscribe(handleScroll);
    syncScroll.subscribe(handleScroll);

    return () => {
      syncResize.unsubscribe(handleScroll);
      syncScroll.unsubscribe(handleScroll);
      
      if (watchedRefs.find(r => r === watchedWrapper.current)) {
        syncResize.unsubscribe(watchedWrapper.current.resizeHandler);
        watchedRefs = watchedRefs.filter(r => r !== watchedWrapper.current);
      }
    };
  }, [handleScroll, ref]);

  useEffect(() => {
    if (
      watchedWrapper.current.offset === undefined ||
      watchedWrapper.current.height === undefined
    ) {
      watchedWrapper.current.resizeHandler();
    }
  }, [ref]);

  if (!watchedWrapper.current.ref.current) {
    return false;
  } else {
    return triggered;
  }
};
