import React, { useCallback, useEffect, useMemo } from "react";

let refs: Array<React.MutableRefObject<HTMLElement | null>> = [];

interface AlwaysFocusableData {
  get: () => typeof refs;
}

interface UseAlwaysFocusable {
  (ref?: React.MutableRefObject<HTMLElement | null>): AlwaysFocusableData;
}

/**
 * Sets element to be focusable even if focus lock was engaged
 * @param ref Ref to the element
 * @returns Method to get all stored refs
 */
export const useAlwaysFocusable: UseAlwaysFocusable = (ref) => {
  useEffect(() => {
    if (ref &&  refs.indexOf(ref) === -1) {
      refs.push(ref);
    }

    return () => {
      refs = refs.filter((f) => {
        return f !== ref;
      });
    };
  }, [ref]);

  const get = useCallback(() => {
    return refs;
  }, []);

  return useMemo(() => {
    return {
      get
    }
  }, [get]);
};
