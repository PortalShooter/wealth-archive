import { useAlwaysFocusable } from "../focus/useAlwaysFocusable";
import { defaultModalGroupOptions } from "./defaults";
import { modalController, useModal } from "./useModal";
import { ReactElement, useCallback, useRef, useEffect } from "react";
import {useWindowSize} from "@/hooks";

type ControlActions = "toggle" | "open" | "close" | "close-all" | "toggle-all";

interface ModalControl {
  (props: {
    /**
     * Unique modal
     */
    id: string;
    /**
     * Action that should be fired on click: "toggle" | "open" | "close" | "close-all" | "toggle-all"
     */
    action?: ControlActions;
    /**
     * Modal group id
     */
    groupId?: string;
    /**
     * Classname of the active control
     */
    activeClassName?: string;
    /**
     * If this control should alwayes be focusable
     */
    alwaysFocusable?: boolean;
    ariaLabel?: string;
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactElement[] | string | null;
    wrapperRef? : React.Ref<HTMLButtonElement | null>,
  }): ReactElement<HTMLButtonElement>;
}

export const ModalControl: ModalControl = ({
  id,
  action = "toggle",
  className,
  groupId = defaultModalGroupOptions["groupId"],
  style,
  children,
  activeClassName = "active",
  alwaysFocusable = false,
  ariaLabel,
  wrapperRef,
}) => {
  const modalState = useModal().groups[groupId];
  const wrapperElement = wrapperRef ?? useRef<HTMLButtonElement | null>(null);
  const {windowWidth} = useWindowSize();

  useAlwaysFocusable(alwaysFocusable ? wrapperElement : undefined);

  const handleClick = useCallback(() => {
    if (action === "open") {
      modalController.open(id, groupId);
      document.body.classList.add('modal-opened')
    } else if (action === "close") {
      modalController.close(id, groupId);
      // if (windowWidth > 1024) {
        document.body.classList.remove('modal-opened')
        window.scrollTo({top: document.body.getAttribute('scrollY'), behavior: 'instant'})
      // }
    } else if (action === "toggle") {
      modalController.toggle(id, groupId);
    } else if (action === "close-all") {
      modalController.closeAll(groupId);
      // if (windowWidth > 1024) {
        document.body.classList.remove('modal-opened')
        window.scrollTo({top: document.body.getAttribute('scrollY'), behavior: 'instant'})
      // }
    } else if (action === "toggle-all") {
      modalController.toggleAll(id, groupId);
    }
  }, [id, groupId, action]);

  const classes: string[] = [];
  const active = modalState && modalState.active.includes(id);

  if (action === "open" || action === "close" || action === "toggle") {
    if (modalState && modalState.active.includes(id)) {
      classes.push(activeClassName);
    }
  } else if (action === "close-all" || action === "toggle-all") {
    if (modalState && modalState.active.length) {
      classes.push(activeClassName);
    }
  }

  if (className) {
    classes.push(className);
  }

  return (
    <button
      ref={wrapperElement}
      className={classes.join(" ")}
      onClick={handleClick}
      style={style}
      aria-haspopup={
        action !== "close" && action !== "close-all" ? "true" : undefined
      }
      aria-expanded={
        action !== "close" && action !== "close-all" ? active : undefined
      }
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};
