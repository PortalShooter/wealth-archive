import { useState, useEffect } from 'react';
import { isBrowser } from 'src/shared/utils/window';

function getSize() {
  return {
    windowWidth: isBrowser ? window.innerWidth : null,
    windowHeight: isBrowser ? window.innerHeight : null,
  };
}
function debounce(func, wait, immediate)  {
  let timeout;

  return function executedFunction() {
    const context = this;
    const args = arguments;

    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    const callNow = immediate && !timeout;

    clearTimeout(timeout);

    timeout = setTimeout(later, wait);

    if (callNow) func.apply(context, args);
  };
};

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState(() => getSize());

  useEffect(() => {
    const handleResize  =
      debounce(function() {setWindowSize(getSize())},50,false)
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}
