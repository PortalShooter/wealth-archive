import { useCallback, useEffect, useMemo, useState } from "react";
import { EventEmitter } from "../utils/EventEmitter";
import { defaultModalGroupOptions } from "./defaults";
import { ModalGroupOptions } from "./types";

type ModalEvent = {
  type:
    | "modal:open"
    | "modal:close"
    | "modal:toggle"
    | "modal:close-all"
    | "modal:toggle-all"
    | "modal:group-set"
    | "modal:state-changed";
  payload: {
    id?: string;
    groupId?: string;
    focusLock?: ModalGroupOptions["focusLock"];
    scrollLock?: ModalGroupOptions["scrollLock"];
    mode?: ModalGroupOptions["mode"];
  };
};

const modalEventEmitter = new EventEmitter<ModalEvent>();

interface ModalGroup {
  active: string[];
  mode: ModalGroupOptions["mode"];
  scrollLock: ModalGroupOptions["scrollLock"];
  focusLock: ModalGroupOptions["focusLock"];
}

interface ModalGroups {
  [index: string]: ModalGroup | undefined;
}

interface ModalState {
  groups: ModalGroups;
  active: string[];
}

export const globalState: ModalState = {
  groups: {
    [defaultModalGroupOptions.groupId]: {
      active: [],
      focusLock: defaultModalGroupOptions.focusLock,
      mode: defaultModalGroupOptions.mode,
      scrollLock: defaultModalGroupOptions.scrollLock,
    },
  },
  active: [],
};

modalEventEmitter.subscribe((e) => {
  if (e.type === "modal:open") {
    if (!e.payload.id) {
      return;
    }

    const groupId = e.payload.groupId || defaultModalGroupOptions.groupId;
    const groupState = globalState.groups[groupId];
    if (!groupState) {
      return;
    }

    if (e.payload.initialModal) {
      groupState.initialModal = e.payload.initialModal
    } else {
      groupState.initialModal = 0
    }

    if (groupState.active.includes(e.payload.id)) {
      return;
    } else {
      if (groupState.mode === "replace") {
        groupState.active = [e.payload.id];
      } else if (groupState.mode === "push") {
        groupState.active.push(e.payload.id);
      } else {
        return;
      }

      globalState.active = Object.keys(globalState.groups).reduce(
        (prev: string[], cur: string) => {
          const groupState = globalState.groups[cur];
          if (!groupState) {
            return prev;
          } else {
            return prev.concat(groupState.active);
          }
        },
        []
      );

      modalEventEmitter.dispatch({
        type: "modal:state-changed",
        payload: {},
      });
    }
  } else if (e.type === "modal:close") {
    if (!e.payload.id) {
      return;
    }

    const groupId = e.payload.groupId || defaultModalGroupOptions.groupId;
    const groupState = globalState.groups[groupId];
    if (!groupState) {
      return;
    }

    if (!groupState.active.includes(e.payload.id)) {
      return;
    } else {
      groupState.active = groupState.active.filter((id) => {
        return id !== e.payload.id;
      });

      globalState.active = Object.keys(globalState.groups).reduce(
        (prev: string[], cur: string) => {
          const groupState = globalState.groups[cur];
          if (!groupState) {
            return prev;
          } else {
            return prev.concat(groupState.active);
          }
        },
        []
      );

      modalEventEmitter.dispatch({
        type: "modal:state-changed",
        payload: {},
      });
    }
  } else if (e.type === "modal:toggle") {
    if (!e.payload.id) {
      return;
    }

    const groupId = e.payload.groupId || defaultModalGroupOptions.groupId;
    const groupState = globalState.groups[groupId];
    if (!groupState) {
      return;
    }

    if (groupState.active.includes(e.payload.id)) {
      groupState.active = groupState.active.filter((id) => {
        return id !== e.payload.id;
      });
    } else {
      if (groupState.mode === "replace") {
        groupState.active = [e.payload.id];
      } else if (groupState.mode === "push") {
        groupState.active.push(e.payload.id);
      } else {
        return;
      }
    }

    globalState.active = Object.keys(globalState.groups).reduce(
      (prev: string[], cur: string) => {
        const groupState = globalState.groups[cur];
        if (!groupState) {
          return prev;
        } else {
          return prev.concat(groupState.active);
        }
      },
      []
    );

    modalEventEmitter.dispatch({
      type: "modal:state-changed",
      payload: {},
    });
  } else if (e.type === "modal:close-all") {
    const groupId = e.payload.groupId || defaultModalGroupOptions.groupId;
    const groupState = globalState.groups[groupId];
    if (!groupState) {
      return;
    }

    if (groupState.active.length === 0) {
      return;
    } else {
      groupState.active = [];

      globalState.active = Object.keys(globalState.groups).reduce(
        (prev: string[], cur: string) => {
          const groupState = globalState.groups[cur];
          if (!groupState) {
            return prev;
          } else {
            return prev.concat(groupState.active);
          }
        },
        []
      );
    }

    modalEventEmitter.dispatch({
      type: "modal:state-changed",
      payload: {},
    });
  } else if (e.type === "modal:toggle-all") {
    if (!e.payload.id) {
      return;
    }

    const groupId = e.payload.groupId || defaultModalGroupOptions.groupId;
    const groupState = globalState.groups[groupId];
    if (!groupState) {
      return;
    }

    globalState.groups = {
      ...globalState.groups,
      [groupId]: {
        ...groupState,
        active: groupState.active.length ? [] : [e.payload.id],
      },
    };

    modalEventEmitter.dispatch({
      type: "modal:state-changed",
      payload: {},
    });
  } else if (e.type === "modal:group-set") {
    const groupId = e.payload.groupId || defaultModalGroupOptions.groupId;
    const groupState = globalState.groups[groupId];

    globalState.groups = {
      ...globalState.groups,
      [groupId]: {
        active: groupState ? groupState.active : [],
        mode: e.payload.mode || defaultModalGroupOptions.mode,
        scrollLock: e.payload.scrollLock || defaultModalGroupOptions.scrollLock,
        focusLock: e.payload.focusLock || defaultModalGroupOptions.focusLock,
      },
    };

    modalEventEmitter.dispatch({
      type: "modal:state-changed",
      payload: {},
    });
  }
});

export const modalController = {
  open: (id: string, groupId?: string, initialModal: number) => {
    modalEventEmitter.dispatch({
      type: "modal:open",
      payload: {
        id,
        groupId: groupId || defaultModalGroupOptions.groupId,
        initialModal: initialModal || 0,
      },
    });
  },
  close: (id: string, groupId?: string) => {
    modalEventEmitter.dispatch({
      type: "modal:close",
      payload: {
        id,
        groupId: groupId || defaultModalGroupOptions.groupId,
      },
    });
  },
  toggle: (id: string, groupId?: string) => {
    modalEventEmitter.dispatch({
      type: "modal:close",
      payload: {
        id,
        groupId: groupId || defaultModalGroupOptions.groupId,
      },
    });
  },
  closeAll: (groupId?: string) => {
    modalEventEmitter.dispatch({
      type: "modal:close-all",
      payload: {
        groupId: groupId || defaultModalGroupOptions.groupId,
      },
    });
  },
  toggleAll: (id: string, groupId?: string) => {
    modalEventEmitter.dispatch({
      type: "modal:toggle-all",
      payload: {
        id,
        groupId: groupId || defaultModalGroupOptions.groupId,
      },
    });
  },
  setGroupOptions: (
    groupId: string,
    mode?: ModalGroupOptions["mode"],
    focusLock?: ModalGroupOptions["focusLock"],
    scrollLock?: ModalGroupOptions["scrollLock"]
  ) => {
    modalEventEmitter.dispatch({
      type: "modal:group-set",
      payload: {
        groupId,
        mode,
        focusLock,
        scrollLock,
      },
    });
  },
};

export const useModal = () => {
  const [localState, setLocalState] = useState<ModalState>({ ...globalState });

  const handleEventEmitter = useCallback((e: ModalEvent) => {
    if (e.type === "modal:state-changed") {
      setLocalState({ ...globalState });
    }
  }, []);

  useEffect(() => {
    modalEventEmitter.subscribe(handleEventEmitter);

    return () => {
      modalEventEmitter.unsubscribe(handleEventEmitter);
    };
  }, [handleEventEmitter]);

  return useMemo(() => {
    return {
      ...localState,
      ...modalController,
    };
  }, [localState]);
};
