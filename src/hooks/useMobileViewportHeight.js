import {useEffect} from "react";
import {syncResize} from "@/shared/resize";

function useMobileViewportHeight() {
  const handleResize = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }

  useEffect(() => {
    handleResize();
    syncResize.subscribe(handleResize);

    return () => syncResize.unsubscribe(handleResize);
  }, [])
}

export default useMobileViewportHeight;
