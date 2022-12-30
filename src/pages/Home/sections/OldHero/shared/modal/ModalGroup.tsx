import React, { useEffect, createContext } from "react";
import { ModalGroupOptions } from "./types";
import { defaultModalGroupOptions } from "./defaults";
import { useScrollLock } from "../scroll/useScrollLock";
import { Modal } from ".";
import { modalController, useModal } from "./useModal";

export interface ModalGroup {
  (props: {
    /**
     * Unique group Id
     */
    id?: ModalGroupOptions["groupId"];
    /**
     * How modals should work. "replace" to close the previous modal window or "push" to leave all windows open.
     */
    mode?: ModalGroupOptions["mode"];
    /**
     * If scrollbar should be locked.
     */
    scrollLock?: ModalGroupOptions["scrollLock"];
    /**
     * If focus should be locked inside of the modal window. Check "focus/useAlwaysFocusable" to add elements that shoul always be focusable. Owerwrites the same property on children
     */
    focusLock?: ModalGroupOptions["scrollLock"];
    /**
     * Property that should be used to offset the scrollbar on windows. Default is "right" Owerwrites the same property on children
     */
    offsetScrollbar?: ModalGroupOptions["offsetScrollbar"];
    children: React.ReactElement<Modal> | React.ReactElement<Modal>;
    className?: string;
  }): React.ReactElement<HTMLDivElement>;
}

export const ModalContext = createContext<ModalGroupOptions>({
  groupId: defaultModalGroupOptions.groupId,
  mode: defaultModalGroupOptions.mode,
  scrollLock: defaultModalGroupOptions.scrollLock,
  focusLock: defaultModalGroupOptions.focusLock,
  offsetScrollbar: defaultModalGroupOptions.offsetScrollbar
});

export const ModalGroup: ModalGroup = ({
  id = defaultModalGroupOptions.groupId,
  mode = defaultModalGroupOptions.mode,
  scrollLock = defaultModalGroupOptions.scrollLock,
  focusLock = defaultModalGroupOptions.focusLock,
  offsetScrollbar = defaultModalGroupOptions.offsetScrollbar,
  children = null,
}) => {
  const modalState = useModal().groups[id];

  const modalLockScroll: boolean = scrollLock && !!modalState?.active.length;
  const { lockScroll, unlockScroll } = useScrollLock();

  useEffect(() => {
    modalController.setGroupOptions(id, mode, scrollLock, focusLock);
  }, [id, mode, scrollLock, focusLock]);

  useEffect(() => {
    if (modalLockScroll) {
      lockScroll("Modal");
    } else {
      unlockScroll("Modal");
    }
  }, [modalLockScroll, lockScroll]);

  return (
    <ModalContext.Provider value={{
      groupId: id,
      mode,
      scrollLock,
      focusLock,
      offsetScrollbar
    }}>
      {children}
    </ModalContext.Provider>
  )
};
