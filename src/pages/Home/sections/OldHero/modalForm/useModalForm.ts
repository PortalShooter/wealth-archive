import { useCallback, useEffect, useMemo, useState } from "react";
import { EventEmitter } from "../shared/utils/EventEmitter";

type ModalEvent = {
  type:
    | "modal:open-all"
    | "modal:open-personal"
    | "modal:open-report"
    | "modal:state-changed";
  payload: {
    isAll?: boolean;
    isPersonal?: boolean;
    isReport?: boolean;
  };
};

const modalEventEmitter = new EventEmitter<ModalEvent>();

interface ModalFormStateProps {
  personal: boolean;
  report: boolean;
}

export const ModalFormState: ModalFormStateProps = {
  personal: false,
  report: false,
};

modalEventEmitter.subscribe((e) => {
  if (e.type === "modal:open-all") {
    ModalFormState.personal = false;
    ModalFormState.report = false;

    modalEventEmitter.dispatch({
      type: "modal:state-changed",
      payload: {},
    });
  } else if (e.type === "modal:open-personal") {
    ModalFormState.personal = true;
    ModalFormState.report = false;

    modalEventEmitter.dispatch({
      type: "modal:state-changed",
      payload: {},
    });
  } else if (e.type === "modal:open-report") {
    ModalFormState.personal = false;
    ModalFormState.report = true;

    modalEventEmitter.dispatch({
      type: "modal:state-changed",
      payload: {},
    });
  }
});

export const modalFormController = {
  all: (isAll: boolean) => {
    modalEventEmitter.dispatch({
      type: "modal:open-all",
      payload: { isAll },
    });
  },
  personal: (isPersonal: boolean) => {
    modalEventEmitter.dispatch({
      type: "modal:open-personal",
      payload: { isPersonal },
    });
  },
  report: (isReport: boolean) => {
    modalEventEmitter.dispatch({
      type: "modal:open-report",
      payload: { isReport },
    });
  },
};

export const useModalForm = () => {
  const [localState, setLocalState] = useState<ModalFormStateProps>({
    ...ModalFormState,
  });

  const handleEventEmitter = useCallback((e: ModalEvent) => {
    if (e.type === "modal:state-changed") {
      setLocalState({ ...ModalFormState });
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
      ...modalFormController,
    };
  }, [localState]);
};
