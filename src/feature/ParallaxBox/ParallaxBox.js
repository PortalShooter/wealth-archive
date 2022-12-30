import React, {useEffect, useRef, useState} from "react";
import {motion, useTransform, useViewportScroll} from "framer-motion";
import {syncResize} from "@/shared/resize";

function ParallaxBox({children, scrollModifier = 1, /*offset = 100,*/ ...props}) {
  const [elementTop, setElementTop] = useState(0);
  const [clientHeight, setClientHeight] = useState(0);
  const ref = useRef(null);

  const {scrollY} = useViewportScroll();

  // start animating our element when we've scrolled it into view
  const initial = elementTop - clientHeight;
  // end our animation when we've scrolled the offset specified
  const final = elementTop + clientHeight;

  const easing = [0.19, 1, 0.22, 1];
  const y = useTransform(
    scrollY,
    [initial, final],
    [clientHeight * (scrollModifier - 1), -clientHeight * (scrollModifier - 1)]
  );
  // const y = useTransform(scrollY, [initial, final], [offset, -offset])

  useEffect(() => {
    const element = ref.current;
    // save our layout measurements in a function in order to trigger
    // it both on mount and on resize
    const onResize = () => {
      // use getBoundingClientRect instead of offsetTop in order to
      // get the offset relative to the viewport
      setElementTop(element.getBoundingClientRect().top + window.scrollY || window.pageYOffset);
      setClientHeight(window.innerHeight);
    };

    onResize();
    syncResize.subscribe(onResize);
    return () => syncResize.unsubscribe(onResize);
  }, [ref]);

  return (
    <motion.li style={{y}} {...props} ref={ref} transition={{ease: easing}}>
      {children}
    </motion.li>
  );
}

export default ParallaxBox;
