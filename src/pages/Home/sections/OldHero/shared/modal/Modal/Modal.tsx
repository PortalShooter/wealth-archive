import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  ReactElement,
  CSSProperties,
  useContext
} from "react";
import { modalController } from "../useModal";
import { useRouter } from "next/dist/client/router";
import { useScrollLock } from "../../scroll";
import { getFocusable } from "../../utils/dom.utils";
import { useFocusLock } from "../../focus";
import { OffsetScrollbar } from "../../scroll/types";
import { useNoAnimation, UseAnimation } from "./animations";
import { ModalContext } from "../ModalGroup";
import classNames from "classnames";
import { useModal } from "../useModal";

export interface Modal {
  (props: {
    /**
     * Unique modal Id. Required.
     */
    id: string;
    /**
     * Id of the group of the modals. (Modal component can be used without the ModalGroup wrapper, but scroll locking will not work)
     */
    groupId?: string;
    /**
     * Classname that will be added when the modal window is active.
     */
    activeClassName?: string;
    /**
     * Classname that will be added when the modal window is initialized.
     */
    initializedClassName?: string;
    /**
     * Animation hook
     */
    animation?: UseAnimation;
    /**
     * If focus should be locked inside of the modal window. Check "focus/useAlwaysFocusable" to add elements that shoul always be focusable
     */
    focusLock?: boolean;
    /**
     * Duration of the animation when the Modal is closed
     */
    openDuration?: number;
    /**
     * Duration of the animation when the Modal is closed
     */
    closeDuration?: number;

    opened?: boolean;

    closeOnRoute?: boolean;
    /**
     * Property that should be used to offset the scrollbar on windows. Default is "right"
     */
    offsetScrollbar?: OffsetScrollbar;

    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactElement[] | React.ReactElement | null;
  }): ReactElement<HTMLDivElement>;
}

export const Modal: Modal = ({
  id,
  groupId,
  className,
  activeClassName = "active",
  initializedClassName = "initialized",
  style = {},
  children = null,
  openDuration = 0.3,
  closeDuration = 0.3,
  opened = false,
  closeOnRoute = true,
  animation = useNoAnimation,
  focusLock,
  offsetScrollbar,
}) => {
  const context = useContext(ModalContext);

  const newGroupId = groupId !== undefined ? groupId : context.groupId;
  const newFocusLock = focusLock !== undefined ? focusLock : context.focusLock;
  const newOffsetScrollbar = offsetScrollbar !== undefined ? offsetScrollbar : context.offsetScrollbar;

  const [initialized, setInitialized] = useState<boolean>(false);
  const [active, setActive] = useState<boolean>(false);

  const modalState = useModal().groups[newGroupId];

  const stateActive = modalState?.active.includes(id);

  const activeRef = useRef(false);
  const wrapperElement = useRef<HTMLDivElement | null>(null);
  const focusLockHook = useFocusLock(wrapperElement);

  const lockFocus = focusLockHook.lock;
  const unlockFocus = focusLockHook.unlock;
  const disabledElementsRef = useRef<HTMLElement[]>([]);

  const enableFocus = useCallback(() => {
    if (!wrapperElement.current) return;
    disabledElementsRef.current.forEach((el) => {
      el.setAttribute("tabindex", "0");
    });

    disabledElementsRef.current = [];

    if (newFocusLock) {
      lockFocus();
    }
  }, [newFocusLock, lockFocus]);

  const disableFocus = useCallback(() => {
    if (!wrapperElement.current) return;

    getFocusable(wrapperElement.current).forEach((el) => {
      disabledElementsRef.current.push(el);
      el.setAttribute("tabindex", "-1");
    });

    if (newFocusLock) {
      unlockFocus();
    }
  }, [newFocusLock, unlockFocus]);

  useEffect(() => {
    setTimeout(() => {
      setInitialized(true);
    }, 1000 / 60);

    if (stateActive && !activeRef.current) {
      activeRef.current = true;

      enableFocus();
      setActive(true);
    } else if (!stateActive && activeRef.current) {
      activeRef.current = false;

      disableFocus();
      setActive(false);
    }
  }, [enableFocus, disableFocus, stateActive, activeClassName]);

  useEffect(() => {
    if (!wrapperElement.current) return;

    if (stateActive) {
      disabledElementsRef.current.forEach((el) => {
        el.setAttribute("tabindex", "0");
      });

      disabledElementsRef.current = [];
    } else {
      getFocusable(wrapperElement.current).forEach((el) => {
        disabledElementsRef.current.push(el);
        el.setAttribute("tabindex", "-1");
      });
    }
  }, [children]);

  const router = useRouter();

  useEffect(() => {
    const handleRouter = () => {
      modalController.close(id, newGroupId);
    };

    if (closeOnRoute) {
      router.events.on("routeChangeStart", handleRouter);
    }

    return () => {
      if (closeOnRoute) {
        router.events.off("routeChangeStart", handleRouter);
      }
    };
  }, [closeOnRoute, newGroupId, id, router.events]);

  useEffect(() => {
    if (opened) {
      modalController.open(id, newGroupId);
    }
  }, [opened, id, newGroupId]);

  animation({
    id,
    groupId: newGroupId,
    wrapperElement,
    openDuration,
    closeDuration,
  });

  const scrollLock = useScrollLock();

  if (newOffsetScrollbar === "right") {
    style.right = scrollLock.offset;
  } else if (newOffsetScrollbar === "paddingRight") {
    style.paddingRight = scrollLock.offset;
  } else if (newOffsetScrollbar === "marginRight") {
    style.marginRight = scrollLock.offset;
  }

  style.transitionDuration = initialized ? "" : "0s";
  const newStyle: CSSProperties = {
    pointerEvents: active ? "auto" : "none",
  };

  return (
    <div
      ref={wrapperElement}
      className={classNames(
        className,
        active && activeClassName,
        initialized && initializedClassName
      )}
      style={{ ...newStyle, ...style }}
    >
      {children}
    </div>
  );
};
