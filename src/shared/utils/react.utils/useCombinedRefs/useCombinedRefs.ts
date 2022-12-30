import React, { useEffect } from "react";

type Ref<T> =  React.MutableRefObject<T>
| React.ForwardedRef<T>
| ((ref: T) => void);

export const useCombinedRefs = <T>(
  ...refs: Array<Ref<T>>
) => {
  const targetRef = React.useRef<T>(null);

  // console.log(targetRef);

  refs.forEach((ref: Ref<T>) => {
    if (!ref) return;

    if (typeof ref === "function") {
      ref(targetRef.current as T);
    } else {
      ref.current = targetRef.current;
    }
  });

  return targetRef;
};
