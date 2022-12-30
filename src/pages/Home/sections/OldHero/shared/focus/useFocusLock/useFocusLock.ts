import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useAlwaysFocusable } from "../useAlwaysFocusable"
import { getFocusable } from "../../utils/dom.utils"

interface UseFocusLockData {
  lock: VoidFunction
  unlock: VoidFunction
  locked: boolean
}

interface UseFocusLock {
  (element?: React.MutableRefObject<HTMLElement | null>): UseFocusLockData
}

/**
 * Limits focus to children of the passed element
 * @param element Ref to the element
 * @returns Current status & methods to lock and unlock foucs
 */
export const useFocusLock: UseFocusLock = (element) => {
  const [locked, setLocked] = useState(false)
  const lockedRef = useRef(false)
  const focusIndex = useRef(0)
  const isFocusOn = useRef(false)
  const focusableElements = useRef<HTMLElement[]>([])

  const alwaysFocusable = useAlwaysFocusable()

  const handleKeyboard = useCallback((e: KeyboardEvent) => {
    if (!isFocusOn.current) return

    let forcedExit = 0;

    if (e.key === "Tab") {
      if (e.shiftKey) {
        focusIndex.current--;
        if (!focusableElements.current[focusIndex.current]) {
          focusIndex.current = focusableElements.current.length - 1;
        }

        // Choose an element with a positive tabindex
        while (forcedExit < 1000) {
          forcedExit++;

          const tabindex = focusableElements.current[focusIndex.current].tabIndex;
          if (tabindex < 0) {
            focusIndex.current--;
          } else {
            break;
          }
        }
        if (!focusableElements.current[focusIndex.current]) {
          focusIndex.current = focusableElements.current.length - 1
        }

      } else {
        focusIndex.current++;
        if (!focusableElements.current[focusIndex.current]) {
          focusIndex.current = 0;
        }

        // Choose an element with a positive tabindex
        while (forcedExit < 1000) {
          forcedExit++;

          const tabindex = focusableElements.current[focusIndex.current].tabIndex;
          if (tabindex < 0) {
            focusIndex.current++;
          } else {
            break;
          }
        }

        if (!focusableElements.current[focusIndex.current]) {
          focusIndex.current = 0
        }
      }

      setTimeout(() => {
        focusableElements.current[focusIndex.current].focus({
          preventScroll: true,
        });
      }, 0);
    }
  }, [])

  const lock = useCallback(() => {
    if (lockedRef.current) return

    focusableElements.current = alwaysFocusable
      .get()
      .map((el) => {
        return el.current
      })
      .filter((el) => {
        return el !== null
      })
      .map((el) => {
        return el as HTMLElement
      })
      .concat(element?.current ? getFocusable(element.current, true) : [])
      .sort((a, b) => {
        const ta = Math.max(0, a.tabIndex || 0);
        const tb = Math.max(0, b.tabIndex || 0);

        if (element?.current === document.activeElement) {
          return -2
        }

        if (ta === 0) {
          if (
            (a.tagName.toLowerCase() === "input" ||
              a.tagName.toLowerCase() === "textarea") &&
            b.tagName.toLowerCase() !== "input" &&
            b.tagName.toLowerCase() !== "textarea"
          ) {
            return -1
          }
        }

        return ta - tb
      })

    focusableElements.current[0].focus({ preventScroll: true })
    focusIndex.current = 0
    isFocusOn.current = true

    lockedRef.current = true
    setLocked(lockedRef.current)
  }, [alwaysFocusable, element])

  const unlock = useCallback(() => {
    if (!lockedRef.current) return;

    isFocusOn.current = false;
    lockedRef.current = false;

    setLocked(lockedRef.current)
  }, [])

  useEffect(() => {
    document.addEventListener("keydown", handleKeyboard)
    return () => {
      document.removeEventListener("keydown", handleKeyboard)
    }
  }, [handleKeyboard])

  return useMemo<UseFocusLockData>(() => {
    return {
      lock,
      unlock,
      locked,
    }
  }, [locked, lock, unlock])
}
