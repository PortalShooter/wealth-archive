import {useEffect, useRef, useState} from "react";

function useHover() {
  const [value, setValue] = useState(false);
  const ref = useRef(null);
  const handleClick = () => setValue(true);
  useEffect(
    () => {
      const node = ref.current;
      if (node) {
        node.addEventListener('click', handleClick);
        return () => {
          node.removeEventListener('click', handleClick);
        };
      }
    },
    [ref.current] // Recall only if ref changes
  );
  return [ref, value];
}

export default useHover;
