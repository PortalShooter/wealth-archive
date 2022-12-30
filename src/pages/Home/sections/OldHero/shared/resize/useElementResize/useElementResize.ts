import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { useResize } from "../useResize";

interface ElementSize {
  width: number;
  height: number;
};

interface Resize extends ElementSize {
  get: () => ElementSize
};

interface UseElementResize {
  (element: HTMLElement | null): Resize;
}

const isHTMLElement = (p: HTMLElement | null): p is HTMLElement => {
  return !!p && (p as HTMLElement).tagName !== undefined;
};

/**
 * Called when element is resized. Checks new size every time the window is resized. It will not fire if window size stays the same.
 * @param element HTMLElement
 * @returns Element size
 */
export const useElementResize: UseElementResize = (element) => {
  const sizeRef = useRef<ElementSize>({
    width: 0,
    height: 0,
  });

  const [size, setState] = useState(sizeRef.current);

  const screenSize = useResize();

  const get = useCallback(() => {
    return sizeRef.current
  }, []);

  useEffect(() => {
    setState((prevState) => {
      if (isHTMLElement(element)) {
        let w = element.clientWidth;
        let h = element.clientHeight;

        sizeRef.current.width = w;
        sizeRef.current.height = h;
  
        if (w !== prevState.width || h !== prevState.height) {
          return {
            width: sizeRef.current.width,
            height: sizeRef.current.height,
          }
        } else {
          return prevState;
        }
      } else {
        return prevState;
      }
    })
  }, [element, screenSize.width, screenSize.height]);

  return useMemo(() => {
    return {
      width: size.width,
      height: size.height,
      get
    };
  }, [size.width, size.height, get]);
};
