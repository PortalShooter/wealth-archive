import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { UseAnimation } from "./interface";
import { transition } from "../../../utils/animation.utils";
import { useModal } from "../../useModal";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export const useFadeAnimation: UseAnimation = ({
  id, 
  groupId, 
  wrapperElement,
  openDuration,
  closeDuration
}) => {
  const modalState = useModal().groups[groupId];

  const [visible, setVisible] = useState(false);
  const timeout: React.MutableRefObject<null | ReturnType<typeof setTimeout>> = useRef(null);

  const stateActive = modalState?.active.includes(id);

  useEffect(() => {
    if (stateActive) {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }

      setVisible(true);
    } else {
      timeout.current = setTimeout(() => {
        setVisible(false);
      }, closeDuration * 1000);
    }
  }, [stateActive, closeDuration]);

  useIsomorphicLayoutEffect(() => {
    if (!wrapperElement.current) {
      return;
    }

    if (stateActive && visible) {
      wrapperElement.current.style.opacity = "0";

      requestAnimationFrame(() => {
        if (!wrapperElement.current) {
          return;
        }

        transition(wrapperElement.current, openDuration, {
          opacity: 1,
        }, {
          ease: "default",
          skipFrame: true
        });
      })
    } else if (!stateActive) {
      transition(wrapperElement.current, closeDuration, {
        opacity: 0,
      }, {
        ease: "default"
      });
    }
  }, [stateActive, visible, wrapperElement, closeDuration, openDuration]);

  return {
    visible,
  };
};