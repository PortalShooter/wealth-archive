import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  ReactElement,
  CSSProperties,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/dist/client/router";
import { modalOpen, modalClose } from "@/redux/reducers/modalReducer/actions";
import { useScrollLock } from "../../scroll";
import { getFocusable } from "../../utils/dom.utils";
import { useFocusLock } from "../../focus";
import { OffsetScrollbar } from "../../scroll/types";
import { useNoAnimation, UseAnimation } from "./animations";
import { DEFAULT_GROUP_ID } from "../types";
import classNames from "classnames";

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
    children?: React.ReactNode;
  }): ReactElement<HTMLDivElement>;
}

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export const Modal: Modal = ({
  id,
  groupId = DEFAULT_GROUP_ID,
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
  focusLock = true,
  offsetScrollbar = "paddingRight",
}) => {
  const [initialized, setInitialized] = useState<boolean>(false);
  const [active, setActive] = useState<boolean>(false);

  const modalState = useSelector((state: RootState) =>
    state.modal ? state.modal.groups[groupId] : undefined
  );

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

    if (focusLock) {
      lockFocus();
    }
  }, [focusLock, lockFocus]);

  const disableFocus = useCallback(() => {
    if (!wrapperElement.current) return;

    getFocusable(wrapperElement.current).forEach((el) => {
      disabledElementsRef.current.push(el);
      el.setAttribute("tabindex", "-1");
    });

    if (focusLock) {
      unlockFocus();
    }
  }, [focusLock, unlockFocus]);

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

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const handleRouter = () => {
      dispatch(modalClose(id, groupId));
    };

    if (closeOnRoute) {
      router.events.on("routeChangeStart", handleRouter);
    }

    return () => {
      if (closeOnRoute) {
        router.events.off("routeChangeStart", handleRouter);
      }
    };
  }, [closeOnRoute, dispatch, groupId, id, router.events]);

  useEffect(() => {
    if (opened) {
      dispatch(modalOpen(id, groupId));
    }
  }, [opened, dispatch, id, groupId]);

  const animationResult = animation({
    id,
    groupId,
    wrapperElement,
    openDuration,
    closeDuration,
  });

  const scrollLock = useScrollLock();

  if (offsetScrollbar === "right") {
    style.right = scrollLock.offset;
  } else if (offsetScrollbar === "paddingRight") {
    style.paddingRight = scrollLock.offset;
  } else if (offsetScrollbar === "marginRight") {
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
