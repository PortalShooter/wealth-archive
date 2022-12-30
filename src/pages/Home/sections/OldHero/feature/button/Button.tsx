import cn from "classnames";
import React, { AriaAttributes, ReactElement } from "react";
import styles from "./Button.module.scss";
import green from "./types/Green.module.scss";

export interface ButtonProps {
  propRef?: React.MutableRefObject<HTMLElement | null>;
  className?: string;
  children: ReactElement[] | ReactElement | string | null;
  href?: string;
  type?: "green" | "default";
  color?: "by-type" | "inherit";
  disabled?: boolean;
  outer?: boolean;
  onClick?: VoidFunction;
  onFocus?: VoidFunction;
  onBlur?: VoidFunction;
  ariaHaspopup?: AriaAttributes["aria-haspopup"];
  ariaExpanded?: AriaAttributes["aria-expanded"];
  ariaLabel?: string;
  tabIndex?: number;
  long?: boolean;
}

export interface Button {
  (props: ButtonProps): ReactElement;
}

export const Button: Button = ({
  propRef,
  className,
  children,
  href,
  type = "default",
  color = "by-type",
  disabled = false,
  outer = false,
  onClick,
  onFocus,
  onBlur,
  ariaLabel,
  ariaExpanded,
  ariaHaspopup,
  tabIndex,
  long,
}) => {
  const defaultViewClass = green.Button_Green;
  let viewClass;

  if (type === "default") {
    viewClass = defaultViewClass;
  } else if (type === "green") {
    viewClass = green.Button_Green;
  }

  const link = (
    <a
      ref={(elementRef) => {
        if (propRef) {
          propRef.current = elementRef;
        }
      }}
      className={cn(
        styles.Button,
        color === "inherit" && styles.InheritColor,
        viewClass,
        long && styles.Button_Long,
        className,
      )}
      href={href ? href : ""}
      aria-label={ariaLabel}
      onClick={onClick}
      onFocus={onFocus}
      target={outer ? "_blank" : undefined}
      rel={outer ? "noreferrer" : undefined}
      onBlur={onBlur}
      tabIndex={tabIndex}
    >
      {children}
    </a>
  );

  const button = (
    <button
      ref={(elementRef) => {
        if (propRef) {
          propRef.current = elementRef;
        }
      }}
      className={cn(
        styles.Button,
        color === "inherit" && styles.InheritColor,
        viewClass,
        long && styles.Button_Long,
        className,
      )}
      disabled={disabled}
      aria-haspopup={ariaHaspopup}
      aria-expanded={ariaExpanded}
      aria-label={ariaLabel}
      aria-disabled={disabled}
      onClick={onClick}
      onFocus={onFocus}
      onBlur={onBlur}
      tabIndex={tabIndex}
    >
      {children}
    </button>
  );

  return href ? link : button;
};
