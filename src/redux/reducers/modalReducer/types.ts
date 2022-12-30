export const MODAL_OPEN = "MODAL_OPEN";
export const MODAL_CLOSE = "MODAL_CLOSE";
export const MODAL_TOGGLE = "MODAL_TOGGLE";
export const MODAL_CLOSE_ALL = "MODAL_CLOSE_ALL";
export const MODAL_TOGGLE_ALL = "MODAL_TOGGLE_ALL";
export const MODAL_GROUP_SET = "MODAL_GROUP_SET";

export const DEFAULT_GROUP_ID = "DEFAULT";

export type Modes = "replace" | "push";

export interface PayloadID {
    id: string;
    groupId?: string;
}

export interface PayloadGroupId {
    groupId?: string;
}

export interface PayloadGroup {
    id: string;
    mode: Modes;
    scrollLock: boolean;
    focusLock: boolean;
}

export interface ModalOpen {
    type: typeof MODAL_OPEN,
    payload: PayloadID
} 

export interface ModalClose {
    type: typeof MODAL_CLOSE,
    payload: PayloadID
} 

export interface ModalToggle {
    type: typeof MODAL_TOGGLE,
    payload: PayloadID
} 

export interface ModalToggleAll {
    type: typeof MODAL_TOGGLE_ALL,
    payload: PayloadID
} 

export interface ModalCloseAll {
    type: typeof MODAL_CLOSE_ALL,
    payload: PayloadGroupId
} 

export interface ModalGroupSet {
    type: typeof MODAL_GROUP_SET,
    payload: PayloadGroup
} 