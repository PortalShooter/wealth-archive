import { Reducer } from "react";
import type { AnyAction } from "redux";
import { DEFAULT_GROUP_ID } from "./types";

import {
  MODAL_OPEN,
  MODAL_CLOSE,
  MODAL_TOGGLE,
  MODAL_CLOSE_ALL,
  MODAL_TOGGLE_ALL,
  MODAL_GROUP_SET,
  Modes,
} from "./types";

interface ModalGroup {
  active: string[];
  mode: Modes;
  scrollLock: boolean;
  focusLock: boolean;
}

interface ModalGroups {
  [index: string]: ModalGroup;
}

interface ModalState {
  groups: ModalGroups;
  active: string[];
}

let initialState: ModalState = {
  active: [],
  groups: {},
};

initialState.groups[DEFAULT_GROUP_ID] = {
  active: [],
  mode: "replace",
  scrollLock: true,
  focusLock: true,
};

const deepCopy = (original: ModalState): ModalState => {
  const newGroups: ModalGroups = {};

  Object.keys(original.groups).forEach((key) => {
    newGroups[key] = {
      ...original.groups[key],
      active: [...original.groups[key].active],
    };
  });

  return {
    ...original,
    active: [...original.active],
    groups: newGroups,
  };
};

export const modalReducer: Reducer<ModalState | undefined, AnyAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case MODAL_GROUP_SET: {
      const groupId = action.payload.id || DEFAULT_GROUP_ID;
      return {
        ...state,
        groups: {
          ...state.groups,
          [groupId]: {
            active: state.groups[groupId] ? state.groups[groupId].active : [],
            mode: action.payload.mode,
            scrollLock: action.payload.scrollLock,
            focusLock: action.payload.focusLock,
          },
        },
      };
    }

    case MODAL_OPEN: {
      const groupId = action.payload.groupId || DEFAULT_GROUP_ID;

      if (state.groups[groupId].active.includes(action.payload.id)) {
        return state;
      } else {
        const newState = deepCopy(state);

        if (state.groups[groupId].mode === "replace") {
          newState.groups[groupId].active = [action.payload.id];
        } else if (state.groups[groupId].mode === "push") {
          newState.groups[groupId].active.push(action.payload.id);
        } else {
          return state;
        }

        newState.active = Object.keys(newState.groups).reduce(
          (prev: string[], cur: string) =>
            prev.concat(newState.groups[cur].active),
          []
        );

        return newState;
      }
    }

    case MODAL_CLOSE: {
      const groupId = action.payload.groupId || DEFAULT_GROUP_ID;

      if (!state.groups[groupId].active.includes(action.payload.id)) {
        return state;
      } else {
        const newState = deepCopy(state);

        newState.groups[groupId].active = newState.groups[
          groupId
        ].active.filter((id) => {
          return id !== action.payload.id;
        });

        newState.active = Object.keys(newState.groups).reduce(
          (prev: string[], cur: string) =>
            prev.concat(newState.groups[cur].active),
          []
        );

        return newState;
      }
    }

    case MODAL_TOGGLE: {
      const groupId = action.payload.groupId || "DEFAULT";

      const newState = deepCopy(state);

      if (state.groups[groupId].active.includes(action.payload.id)) {
        newState.groups[groupId].active = newState.groups[
          groupId
        ].active.filter((id) => {
          return id !== action.payload.id;
        });
      } else {
        if (state.groups[groupId].mode === "replace") {
          newState.groups[groupId].active = [action.payload.id];
        } else if (state.groups[groupId].mode === "push") {
          newState.groups[groupId].active.push(action.payload.id);
        } else {
          return state;
        }
      }

      newState.active = Object.keys(newState.groups).reduce(
        (prev: string[], cur: string) =>
          prev.concat(newState.groups[cur].active),
        []
      );

      return newState;
    }

    case MODAL_TOGGLE_ALL: {
      const groupId = action.payload.groupId || "DEFAULT";

      return {
        ...state,
        groups: {
          ...state.groups,
          [groupId]: {
            ...state.groups[groupId],
            active: state.groups[groupId].active.length
            ? []
            : [action.payload.id]
          },
        },
      };
    }

    case MODAL_CLOSE_ALL: {
      const groupId = action.payload.id || DEFAULT_GROUP_ID;

      if (state.groups[groupId].active.length === 0) {
        return state;
      } else {
        const newState = deepCopy(state);
        newState.groups[groupId].active = [];

        newState.active = Object.keys(newState.groups).reduce(
          (prev: string[], cur: string) =>
            prev.concat(newState.groups[cur].active),
          []
        );

        return newState;
      }
    }

    default:
      return state;
  }
};
