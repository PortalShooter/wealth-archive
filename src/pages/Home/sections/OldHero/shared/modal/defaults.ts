import { ModalGroupOptions } from "./types"

export const DEFAULT_GROUP_ID = "DEFAULT";

export const defaultModalGroupOptions: ModalGroupOptions = {
  groupId: DEFAULT_GROUP_ID,
  mode: "replace",
  scrollLock: true,
  focusLock: true,
  offsetScrollbar: "paddingRight"
}