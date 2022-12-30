import React, { useEffect } from "react";
import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { modalGroupSet } from "../../redux/reducers/modalReducer/actions";
import { Modes } from "./types";
import { useScrollLock } from "../scroll/useScrollLock";
import { OffsetScrollbar } from "../scroll/types";
import { DEFAULT_GROUP_ID } from "./types";
import { Modal } from ".";

export interface ModalGroup {
  (props: {
    /** 
     * Unique group Id
    */
    id?: string;
    /**
     * How modals should work. "replace" to close the previous modal window or "push" to leave all windows open.
     */
    mode?: Modes;
    /**
     * If scrollbar should be locked.
     */
    scrollLock?: boolean;
    /**
     * If focus should be locked inside of the modal window. Check "focus/useAlwaysFocusable" to add elements that shoul always be focusable. Owerwrites the same property on children
     */
    focusLock?: boolean;
    /**
     * Property that should be used to offset the scrollbar on windows. Default is "right" Owerwrites the same property on children
     */
    offsetScrollbar?: OffsetScrollbar;
    children: React.ReactElement<Modal> | React.ReactElement<Modal>;
    className?: string;
  }): React.ReactElement<HTMLDivElement>
}

export const ModalGroup:ModalGroup = ({
  id = DEFAULT_GROUP_ID,
  mode = "replace",
  scrollLock = true,
  focusLock = true,
  offsetScrollbar = "paddingRight",
  className,
  children = null,
}) => {
  const dispatch = useDispatch();

  const modalState = useSelector((state: RootState) =>
    state.modal ? state.modal.groups[id] : undefined
  );

  const modalLockScroll:boolean = scrollLock && !!modalState?.active.length;
  const {lockScroll, unlockScroll} = useScrollLock();

  useEffect(() => {
    dispatch(modalGroupSet(id, mode, scrollLock, focusLock));
    return () => { 
    }
  }, [dispatch, focusLock, id, mode, scrollLock]);

  useEffect(() => {
    if (modalLockScroll) {
      lockScroll("Modal");
    } else {
      unlockScroll("Modal");
    }
  }, [lockScroll, dispatch]);

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && typeof child.type === "function") {
      return React.cloneElement(child, {
        ...(child as React.ReactElement).props,
        groupId: id,
        focusLock: focusLock,
        offsetScrollbar: offsetScrollbar
      });
    } else {
      return child;
    }
  });

  return <div className={className}>{childrenWithProps}</div>;
};
