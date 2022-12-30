import {
  MODAL_OPEN,
  MODAL_CLOSE,
  MODAL_TOGGLE,
  MODAL_CLOSE_ALL,
  MODAL_GROUP_SET,
  MODAL_TOGGLE_ALL,
  ModalOpen,
  ModalClose,
  ModalToggle,
  ModalCloseAll,
  ModalToggleAll,
  ModalGroupSet,
  Modes
} from "./types";

/**
 * Open modal
 * @param id Modal id
 * @param groupId Id of the ModalGroup wrapper or undefined
 * @returns Action
 */
export const modalOpen = (id: string, groupId?: string): ModalOpen => ({
  type: MODAL_OPEN,
  payload: {
    id,
    groupId,
  },
});

/**
 * Close modal
 * @param id Modal id
 * @param groupId Id of the ModalGroup wrapper or undefined
 * @returns Action
 */
export const modalClose = (id: string, groupId?: string): ModalClose => ({
  type: MODAL_CLOSE,
  payload: {
    id,
    groupId,
  },
});

/**
 * Toggle (open or close) modal
 * @param id Modal id
 * @param groupId Id of the ModalGroup wrapper or undefined
 * @returns Action
 */
export const modalToggle = (id: string, groupId?: string): ModalToggle => ({
  type: MODAL_TOGGLE,
  payload: {
    id,
    groupId,
  },
});

/**
 * Open modal and close all other modals
 * @param groupId Id of the ModalGroup wrapper or undefined
 * @returns Action
 */
 export const modalToggleAll = (id: string, groupId?: string): ModalToggleAll => ({
  type: MODAL_TOGGLE_ALL,
  payload: {
    id,
    groupId
  }
});

/**
 * Close all modals in the group
 * @param groupId Id of the ModalGroup wrapper or undefined
 * @returns Action
 */
export const modalCloseAll = (groupId?: string): ModalCloseAll => ({
  type: MODAL_CLOSE_ALL,
  payload: {
    groupId
  }
});

/**
 * Sets options for modal group
 * @param id Modal group id
 * @param mode Modal mode ("replace" | "push"). Sets if the previous popup should closed a when new opens
 * @param scrollLock Sets if scroll should be locked when any modal of this group is open
 * @param focusLock Sets if focus should be locked to the open popup
 * @returns Action
 */
export const modalGroupSet = (id: string, mode: Modes, scrollLock: boolean, focusLock: boolean): ModalGroupSet => ({
  type: MODAL_GROUP_SET,
  payload: {
    id,
    mode,
    scrollLock,
    focusLock
  }
});
