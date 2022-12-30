import { FC } from "react";
import classNames from "classnames";
import { Modal as ModalBasic, ModalControl } from "@/shared/modal";

import styles from "./Modal.module.scss";

const CONTROL_LABEL = "Modal Close";

export interface ModalProps {
  /** Unique modal id  */
  id: string;
  /** Unique modal group id  */
  groupId?: string;
  /** Aria-label of the closing buttons  */
  controllAriaLabel?: string;
  /** Overlay with closing onClick */
  hasOverlay?: boolean;
  /** Closing button onClick callback */
  onCloseCb?: () => void;
  className?: string;
}

export const Modal: FC<ModalProps> = ({
  className,
  children,
  id,
  groupId,
  controllAriaLabel = CONTROL_LABEL,
  hasOverlay = true,
  onCloseCb,
}) => {
  const getCloseButton = ({
    className,
    hasCross,
  }: {
    className: string;
    hasCross?: boolean;
  }) => (
    <ModalControl
      className={className}
      id={id}
      groupId={groupId}
      action={"close" as const}
      alwaysFocusable
      ariaLabel={controllAriaLabel}
      onClick={onCloseCb}
    >
      {hasCross && <div className={styles.Cross} />}
      {controllAriaLabel}
    </ModalControl>
  );

  return (
    <ModalBasic
      id={id}
      groupId={groupId}
      className={classNames(styles.Modal, className)}
      activeClassName={styles.Modal_Active}
    >
      {hasOverlay && (
        <div className={styles.Overlay}>
          {getCloseButton({
            className: classNames(styles.Overlay__Button),
          })}
        </div>
      )}
      <div className={classNames(styles.Content)}>
        {children}
        {getCloseButton({
          className: classNames(styles.CloseButton),
          hasCross: true,
        })}
      </div>
    </ModalBasic>
  );
};
