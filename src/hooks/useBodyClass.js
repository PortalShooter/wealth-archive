import { useEffect, useRef } from 'react';

export default function useBodyClass(className) {
  const bodyRef = useRef(null);

  const addBodyClass = (addClassName) => bodyRef.current && bodyRef.current.classList.add(addClassName);
  const removeBodyClass = (removeClassName) => bodyRef.current && bodyRef.current.classList.remove(removeClassName);

  useEffect(() => {
    bodyRef.current = document.querySelector('body');
    bodyRef.current.className = "";
  }, []);

  useEffect(() => {
    if (!bodyRef.current || !className) {
      return;
    }

    // Set up
    if (className instanceof Array) {
      className.map(addBodyClass);
    } else {
      addBodyClass(className);
    }

    // Clean up
    return () => {
      if (className instanceof Array) {
        className.map(removeBodyClass);
      } else {
        removeBodyClass(className);
      }
    };
  }, [className]);
}
