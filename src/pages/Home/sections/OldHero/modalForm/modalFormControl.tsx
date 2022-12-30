import { ReactElement, useCallback, useRef } from "react";
import { ModalControl } from "../shared/modal/ModalControl";
import { modalFormController } from "./useModalForm";

type ControlActions = "all" | "personal" | "report";

interface ModalFormControlProps {
  (props: {
    id: string;
    action?: ControlActions;
    className?: string;
    children?: React.ReactElement[] | string | null;
  }): ReactElement<HTMLButtonElement>;
}

export const ModalFormControl: ModalFormControlProps = ({
                                                          id,
                                                          action = "all",
                                                          className,
                                                          children,
                                                        }) => {
  const handleClick = useCallback(() => {
    if (action === "all") {
      modalFormController.all(true);
    } else if (action === "personal") {
      modalFormController.personal(true);
    } else if (action === "report") {
      modalFormController.report(true);
    }
  }, [action]);

  return (
    <div onClick={handleClick}>
      <ModalControl className={className} id={id} action="open">
        {children}
      </ModalControl>
    </div>
  );
};
