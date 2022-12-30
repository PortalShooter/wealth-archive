import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  modalOpen,
  modalClose,
  modalCloseAll,
  modalToggle,
  modalToggleAll,
} from "../../redux/reducers/modalReducer/actions";
import { useAlwaysFocusable } from "../focus/useAlwaysFocusable";
import { DEFAULT_GROUP_ID } from "./types";
import { ReactElement, useCallback, useRef } from "react";

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
    children?: React.ReactNode;
    onClick?: () => void;
  }): ReactElement<HTMLButtonElement>;
}

export const ModalControl: ModalControl = ({
  id,
  action = "toggle",
  className,
  groupId = DEFAULT_GROUP_ID,
  style,
  children,
  activeClassName = "active",
  alwaysFocusable = false,
  ariaLabel,
  onClick,
}) => {
  const dispatch = useDispatch();
  const modalState = useSelector(
    (state: RootState) => state.modal?.groups[groupId]
  );
  const wrapperElement = useRef<HTMLButtonElement | null>(null);

  useAlwaysFocusable(alwaysFocusable ? wrapperElement : undefined);

  const handleClick = useCallback(() => {
    onClick && onClick();

    if (action === "open") {
      dispatch(modalOpen(id, groupId));
    } else if (action === "close") {
      dispatch(modalClose(id, groupId));
    } else if (action === "toggle") {
      dispatch(modalToggle(id, groupId));
    } else if (action === "close-all") {
      dispatch(modalCloseAll(groupId));
    } else if (action === "toggle-all") {
      dispatch(modalToggleAll(id, groupId));
    }
  }, [dispatch, id, groupId, action]);

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
