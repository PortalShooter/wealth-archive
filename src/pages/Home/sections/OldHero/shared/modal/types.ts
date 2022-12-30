import { OffsetScrollbar } from "../scroll/types";

export type ModalGroupModes = "replace" | "push";

export interface ModalGroupOptions {
  /**
   * Unique group Id
   */
  groupId: string;
  /**
   * How modals should work. "replace" to close the previous modal window or "push" to leave all windows open.
   */
  mode: ModalGroupModes;
  /**
   * If scrollbar should be locked.
   */
  scrollLock: boolean;
  /**
   * If focus should be locked inside of the modal window. Check "focus/useAlwaysFocusable" to add elements that shoul always be focusable. Owerwrites the same property on children
   */
  focusLock: boolean;
  /**
   * Property that should be used to offset the scrollbar on windows. Default is "right" Owerwrites the same property on children
   */
  offsetScrollbar: OffsetScrollbar;
}