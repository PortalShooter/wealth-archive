import { useEffect, useRef, useState } from 'react';
import { throttle } from '@/helpers';
import { syncScroll } from '@/shared/scroll';

const optionDefaults = {
  useKeyDown: true,
  useScroll: true,
  useClickOutside: true,
};

function useUniversalClosing(refs, options) {
  const currentOptions = { ...optionDefaults, ...options };
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isOpen = useRef(false);

  const handleScroll = () => {
    setIsMenuOpen(false);
    isOpen.current = false;
  };

  const throttledHandleScroll = throttle(handleScroll, 500);

  useEffect(() => {
    isOpen.current = isMenuOpen;
  }, [isMenuOpen]);

  const handleKeyDown = (ev) => {
    if (ev.code === 'Escape') {
      setIsMenuOpen(false);
      isOpen.current = false;
    }
  };

  const handleClick = (ev) => {
    let isClickOutside = true;

    refs.forEach((ref) => {
      if (!ref.current) {
        return;
      }

      if (ref.current && ref.current.contains(ev.target)) {
        isClickOutside = false;
      }
    });

    if (isClickOutside) {
      setIsMenuOpen(false);
      isOpen.current = false;
    }
  };

  useEffect(() => {
    if (currentOptions.useScroll) {
      handleScroll();
      document.getElementById('__next').addEventListener('scroll', throttledHandleScroll);
      syncScroll.subscribe(throttledHandleScroll);
    }

    if (currentOptions.useKeyDown) {
      document.addEventListener('keydown', handleKeyDown);
    }

    if (currentOptions.useClickOutside) {
      document.addEventListener('click', handleClick);
    }

    return () => {
      if (currentOptions.useScroll) {
        document.getElementById('__next').removeEventListener('scroll', throttledHandleScroll);
        syncScroll.unsubscribe(throttledHandleScroll);
      }

      if (currentOptions.useKeyDown) {
        document.removeEventListener('keydown', handleKeyDown);
      }

      if (currentOptions.useClickOutside) {
        document.removeEventListener('click', handleClick);
      }
    };
  }, []);

  return [isMenuOpen, setIsMenuOpen];
}

export default useUniversalClosing;
