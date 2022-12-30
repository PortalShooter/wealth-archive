import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { syncResize } from "../syncResize";

export interface ElementSize {
  width: number;
  height: number;
};

export interface Resize extends ElementSize {
  get: () => ElementSize
};

/**
 * Returns the the viewport size & a getter function.
 * @returns Viewport size
 */
export interface UseResize {
  (): Resize;
}

export const useResize:UseResize = () => {
  const sizeRef = useRef<ElementSize>({
    width: 0,
    height: 0,
  });
  const [size, setState] = useState(sizeRef.current);

  const onResize = useCallback(() => {
    const windowSize = syncResize.get();
    sizeRef.current.width = windowSize.width;
    sizeRef.current.height = windowSize.height;

    setState({
      width: sizeRef.current.width,
      height: sizeRef.current.height
    });
  }, []);

  const get = useCallback(() => {
    return sizeRef.current;
  }, []);

  useEffect(() => {
    syncResize.subscribe(onResize);

    onResize();

    return () => {
      syncResize.unsubscribe(onResize);
    };
  }, [onResize]);

  return useMemo(() => {
    return {
      width: size.width,
      height: size.height,
      get: get
    };
  }, [size.width, size.height, get]);
};
